# Win System Monitor

Windows 平台实时系统监控工具，显示网速、CPU 和内存占用信息。

## 技术架构

- **框架**: Tauri 2（Rust 后端 + WebView2 前端容器）
- **前端**: React + TypeScript + Tailwind CSS + Recharts
- **后端**: Rust + sysinfo crate
- **构建工具**: Vite

## 功能列表

- [x] 实时网速监控（上传/下载速率）
- [x] CPU 占用率显示
- [x] 内存占用率显示
- [ ] 实时图表展示
- [ ] 系统托盘支持（最小化到托盘）
- [ ] 开机自启动

## 架构设计

```
┌─────────────────────────────────┐
│         Frontend (React)        │
│  ┌───────┐ ┌───────┐ ┌───────┐ │
│  │网速面板│ │CPU面板│ │内存面板│ │
│  └───┬───┘ └───┬───┘ └───┬───┘ │
│      └─────────┼─────────┘     │
│           Tauri IPC             │
├─────────────────────────────────┤
│        Backend (Rust)           │
│  ┌──────────────────────────┐   │
│  │ sysinfo crate            │   │
│  │  - CPU 占用率             │   │
│  │  - 内存占用率             │   │
│  │  - 网络流量 (上传/下载)   │   │
│  └──────────────────────────┘   │
│  定时采样 (1s interval)         │
│  → 通过 event 推送到前端        │
└─────────────────────────────────┘
```

## 目录结构

```
win-system-monitor/
├── docs/               # 项目文档
├── src/                # React 前端源码
├── src-tauri/          # Rust 后端源码
│   └── src/
│       ├── main.rs     # Tauri 入口
│       └── monitor.rs  # 系统监控模块
├── package.json
└── README.md
```

## 开发环境要求

- Node.js >= 18
- Rust >= 1.70
- Windows 10/11（WebView2 运行时）
