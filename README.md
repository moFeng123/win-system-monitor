# Win System Monitor

基于 Tauri 2 + React + TypeScript 的 Windows 系统监控工具。

## 功能

- 实时网速监控（上传/下载）
- CPU 占用率
- 内存占用率
- 系统托盘支持

## 技术栈

- **后端**: Rust + sysinfo
- **前端**: React + TypeScript + Recharts
- **框架**: Tauri 2
- **样式**: Tailwind CSS

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run tauri dev

# 构建
npm run tauri build
```

## License

MIT
