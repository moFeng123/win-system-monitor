mod monitor;

use monitor::{Monitor, MonitorState, SystemStats};
use std::sync::Mutex;
use tauri::Emitter;

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

            // Start background thread to emit system stats every second
            let handle = app.handle().clone();
            std::thread::spawn(move || {
                let mut monitor = Monitor::new();
                loop {
                    std::thread::sleep(std::time::Duration::from_secs(1));
                    let stats = monitor.refresh();
                    let _ = handle.emit("system-stats", &stats);
                }
            });

            Ok(())
        })
        .manage(MonitorState(Mutex::new(Monitor::new())))
        .invoke_handler(tauri::generate_handler![get_system_stats])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
