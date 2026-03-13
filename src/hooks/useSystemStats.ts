import { useState, useEffect, useRef } from 'react'
import { listen } from '@tauri-apps/api/event'

export interface SystemStats {
  cpu_usage: number
  memory_total: number
  memory_used: number
  memory_usage: number
  net_upload_speed: number
  net_download_speed: number
}

export interface StatsHistory {
  time: string
  cpu: number
  memory: number
  download: number
  upload: number
}

const MAX_HISTORY = 60

export function useSystemStats() {
  const [stats, setStats] = useState<SystemStats | null>(null)
  const [history, setHistory] = useState<StatsHistory[]>([])
  const tickRef = useRef(0)

  useEffect(() => {
    const unlisten = listen<SystemStats>('system-stats', (event) => {
      const data = event.payload
      setStats(data)

      tickRef.current += 1
      const timeLabel = `${tickRef.current}s`

      setHistory((prev) => {
        const next = [
          ...prev,
          {
            time: timeLabel,
            cpu: Math.round(data.cpu_usage * 10) / 10,
            memory: Math.round(data.memory_usage * 10) / 10,
            download: data.net_download_speed,
            upload: data.net_upload_speed,
          },
        ]
        return next.length > MAX_HISTORY ? next.slice(-MAX_HISTORY) : next
      })
    })

    return () => {
      unlisten.then((fn) => fn())
    }
  }, [])

  return { stats, history }
}
