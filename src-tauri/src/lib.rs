mod monitor;

use monitor::{Monitor, MonitorState, SystemStats};
use std::sync::Mutex;
use tauri::{Emitter, Manager};
use tauri::tray::TrayIconEvent;

#[tauri::command]
fn get_system_stats(state: tauri::State<MonitorState>) -> SystemStats {
    state.0.lock().unwrap().refresh()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            // Setup tray icon click handler — toggle window visibility
            let tray = app.tray_by_id("main").expect("tray not found");
            let handle = app.handle().clone();
            tray.on_tray_icon_event(move |_tray, event| {
                if let TrayIconEvent::Click { button, button_state, .. } = event {
                    if button == tauri::tray::MouseButton::Left
                        && button_state == tauri::tray::MouseButtonState::Up
                    {
                        let window = handle.get_webview_window("main").unwrap();
                        if window.is_visible().unwrap_or(false) {
                            let _ = window.hide();
                        } else {
                            // Position window directly above the tray icon
                            if let Ok(Some(rect)) = _tray.rect() {
                                let scale = window.scale_factor().unwrap_or(1.0);
                                let win_w = (200.0 * scale) as i32;
                                let win_h = (120.0 * scale) as i32;
                                let margin = (4.0 * scale) as i32;

                                let (tray_x, tray_y, tray_w) = match (&rect.position, &rect.size) {
                                    (tauri::Position::Physical(p), tauri::Size::Physical(s)) => {
                                        (p.x, p.y, s.width as i32)
                                    }
                                    (tauri::Position::Logical(p), tauri::Size::Logical(s)) => {
                                        ((p.x * scale) as i32, (p.y * scale) as i32, (s.width * scale) as i32)
                                    }
                                    _ => (0, 0, 0),
                                };

                                // Center window horizontally on tray icon, place above it
                                let x = tray_x + tray_w / 2 - win_w / 2;
                                let y = tray_y - win_h - margin;
                                let _ = window.set_position(tauri::Position::Physical(
                                    tauri::PhysicalPosition::new(x, y),
                                ));
                            }
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                }
            });

            // Start background thread to emit system stats every second
            let handle2 = app.handle().clone();
            std::thread::spawn(move || {
                let mut monitor = Monitor::new();
                loop {
                    std::thread::sleep(std::time::Duration::from_secs(1));
                    let stats = monitor.refresh();
                    let _ = handle2.emit("system-stats", &stats);
                }
            });

            Ok(())
        })
        .manage(MonitorState(Mutex::new(Monitor::new())))
        .invoke_handler(tauri::generate_handler![get_system_stats])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
