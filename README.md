# Win System Monitor

轻量级 Windows 系统托盘监控工具，点击托盘图标即可查看实时系统状态。

## 功能

- 系统托盘常驻，点击图标弹出极简面板
- 实时 CPU 占用率
- 内存占用（已用/总量）
- 网络上传/下载速度
- 点击面板外自动收起，不打扰工作

## 技术栈

- **框架**: Tauri 2（~3MB 安装包，~20MB 内存占用）
- **后端**: Rust + sysinfo（每秒采集系统数据）
- **前端**: React + TypeScript + Tailwind CSS
- **构建**: Vite

## 开发

### 环境要求

- Node.js >= 18
- Rust >= 1.77
- Windows 10/11（需要 WebView2 运行时）
- Visual Studio Build Tools（C++ 桌面开发工作负载）

### 运行

```bash
npm install
npm run tauri dev
```

### 构建

```bash
npm run tauri build
```

## License

MIT
