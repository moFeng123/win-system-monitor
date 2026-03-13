use serde::Serialize;
use sysinfo::{Networks, System};
use std::sync::Mutex;

#[derive(Debug, Clone, Serialize)]
pub struct SystemStats {
    pub cpu_usage: f32,
    pub memory_total: u64,
    pub memory_used: u64,
    pub memory_usage: f32,
    pub net_upload_speed: u64,
    pub net_download_speed: u64,
}

pub struct Monitor {
    sys: System,
    networks: Networks,
    prev_net_rx: u64,
    prev_net_tx: u64,
}

impl Monitor {
    pub fn new() -> Self {
        let mut sys = System::new_all();
        sys.refresh_all();
        let networks = Networks::new_with_refreshed_list();

        let (prev_net_rx, prev_net_tx) = Self::get_total_bytes(&networks);

        Self {
            sys,
            networks,
            prev_net_rx,
            prev_net_tx,
        }
    }

    fn get_total_bytes(networks: &Networks) -> (u64, u64) {
        let mut total_rx = 0u64;
        let mut total_tx = 0u64;
        for (_name, data) in networks.iter() {
            total_rx += data.total_received();
            total_tx += data.total_transmitted();
        }
        (total_rx, total_tx)
    }

    pub fn refresh(&mut self) -> SystemStats {
        self.sys.refresh_cpu_usage();
        self.sys.refresh_memory();
        self.networks.refresh(true);

        // CPU usage (average across all cores)
        let cpu_usage = self.sys.global_cpu_usage();

        // Memory
        let memory_total = self.sys.total_memory();
        let memory_used = self.sys.used_memory();
        let memory_usage = if memory_total > 0 {
            (memory_used as f32 / memory_total as f32) * 100.0
        } else {
            0.0
        };

        // Network speed (bytes per second)
        let (current_rx, current_tx) = Self::get_total_bytes(&self.networks);
        let net_download_speed = current_rx.saturating_sub(self.prev_net_rx);
        let net_upload_speed = current_tx.saturating_sub(self.prev_net_tx);
        self.prev_net_rx = current_rx;
        self.prev_net_tx = current_tx;

        SystemStats {
            cpu_usage,
            memory_total,
            memory_used,
            memory_usage,
            net_upload_speed,
            net_download_speed,
        }
    }
}

pub struct MonitorState(pub Mutex<Monitor>);
