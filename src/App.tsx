import { useEffect } from 'react'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { useSystemStats } from './hooks/useSystemStats'

function formatSpeed(bytesPerSec: number): string {
  if (bytesPerSec < 1024) return `${bytesPerSec} B/s`
  if (bytesPerSec < 1024 * 1024) return `${(bytesPerSec / 1024).toFixed(1)} KB/s`
  return `${(bytesPerSec / (1024 * 1024)).toFixed(2)} MB/s`
}

function formatMem(bytes: number): string {
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)}`
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[11px] leading-5">
      <span className="text-slate-500">{label}</span>
      <span className="font-mono text-slate-200">{value}</span>
    </div>
  )
}

function App() {
  const { stats } = useSystemStats()

  useEffect(() => {
    const onBlur = () => {
      getCurrentWindow().hide()
    }
    window.addEventListener('blur', onBlur)
    return () => window.removeEventListener('blur', onBlur)
  }, [])

  return (
    <div className="bg-slate-900/95 text-slate-200 px-3 py-2 select-none">
      <Row label="CPU" value={`${(stats?.cpu_usage ?? 0).toFixed(1)}%`} />
      <Row label="MEM" value={stats ? `${formatMem(stats.memory_used)}/${formatMem(stats.memory_total)} GB` : '-'} />
      <div className="border-t border-slate-700/50 my-1" />
      <Row label="↓ DL" value={formatSpeed(stats?.net_download_speed ?? 0)} />
      <Row label="↑ UL" value={formatSpeed(stats?.net_upload_speed ?? 0)} />
    </div>
  )
}

export default App
