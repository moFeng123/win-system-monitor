# 项目进展

## 2026-03-12

### 已完成
- 初始化 Git 仓库，创建 GitHub 远程仓库
- 确定技术架构：Tauri 2 + React + TypeScript
- 搭建项目脚手架（Vite + Tauri + Tailwind CSS）
- 实现 Rust 端系统监控模块（CPU/内存/网速采集）
- 实现 Tauri IPC 事件推送（每秒推送数据）
- 实现系统托盘功能（常驻图标，点击弹出/隐藏）
- 极简纯文字 UI 面板（200x120，无边框）
- 窗口定位在托盘图标正上方
- 失焦自动隐藏（前端 blur 事件）

### 待办
- 开机自启动
- 自定义图标
- 打包发布（Windows 安装包）
- GitHub Release
