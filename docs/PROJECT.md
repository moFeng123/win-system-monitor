# 项目说明

## 概述

Win System Monitor 是一个轻量级的 Windows 系统托盘监控工具。常驻系统托盘，点击图标弹出极简纯文字面板，显示 CPU、内存、网速等关键指标。

## 设计理念

- **极简** — 纯文字显示，无图表无动画，占用空间极小
- **不打扰** — 托盘常驻，点击查看，失焦自动收起
- **轻量** — Tauri 2 框架，安装包 ~3MB，运行内存 ~20MB

## 架构

```
┌──────────────────────────────┐
│    System Tray (托盘图标)     │
│    点击 → 弹出/隐藏面板       │
├──────────────────────────────┤
│    Frontend (React)          │
│    极简纯文字面板 200x120     │
│    - CPU 占用率              │
│    - 内存 已用/总量           │
│    - 网速 上传/下载           │
│    失焦自动隐藏 (blur event)  │
├──────────────────────────────┤
│    Backend (Rust)            │
│    sysinfo crate             │
│    每秒采集 → Tauri event    │
│    推送到前端                 │
└──────────────────────────────┘
```

## 目录结构

```
win-system-monitor/
├── src/                    # React 前端
│   ├── App.tsx             # 主界面（极简面板）
│   ├── hooks/
│   │   └── useSystemStats.ts  # 系统数据 Hook
│   └── index.css           # Tailwind 入口
├── src-tauri/              # Rust 后端
│   ├── src/
│   │   ├── lib.rs          # Tauri 入口 + 托盘 + 事件推送
│   │   ├── main.rs         # 程序入口
│   │   └── monitor.rs      # 系统监控模块 (sysinfo)
│   ├── capabilities/
│   │   └── default.json    # 权限配置
│   ├── Cargo.toml
│   └── tauri.conf.json     # Tauri 窗口/托盘配置
├── docs/                   # 项目文档
├── package.json
└── README.md
```

## 技术选型

| 技术 | 选择 | 理由 |
|------|------|------|
| 桌面框架 | Tauri 2 | 安装包小，内存低，使用系统 WebView2 |
| 后端语言 | Rust | 高性能，sysinfo crate 采集系统信息 |
| 前端框架 | React + TypeScript | 类型安全，生态成熟 |
| 样式 | Tailwind CSS | 快速开发，体积小 |
