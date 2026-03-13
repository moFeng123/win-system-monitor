import { useSystemStats } from './hooks/useSystemStats'
import { GaugeCard } from './components/GaugeCard'
import { NetworkCard } from './components/NetworkCard'
import { StatsChart } from './components/StatsChart'
import { NetworkChart } from './components/NetworkChart'

function formatMemory(bytes: number): string {
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
}

function App() {
  const { stats, history } = useSystemStats()

  return (
    <div className="h-screen p-4 flex flex-col gap-4 overflow-auto">
      <h1 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        System Monitor
      </h1>

      {/* Gauges and Network Card */}
      <div className="grid grid-cols-3 gap-4">
        <GaugeCard
          title="CPU"
          value={stats?.cpu_usage ?? 0}
          unit="%"
          color="#f59e0b"
          subtitle={`${navigator.hardwareConcurrency ?? '-'} cores`}
        />
        <GaugeCard
          title="Memory"
          value={stats?.memory_usage ?? 0}
          unit="%"
          subtitle={stats ? `${formatMemory(stats.memory_used)} / ${formatMemory(stats.memory_total)}` : '-'}
          color="#8b5cf6"
        />
        <NetworkCard
          downloadSpeed={stats?.net_download_speed ?? 0}
          uploadSpeed={stats?.net_upload_speed ?? 0}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        <StatsChart data={history} title="CPU History" dataKey="cpu" color="#f59e0b" />
        <StatsChart data={history} title="Memory History" dataKey="memory" color="#8b5cf6" />
      </div>

      <NetworkChart data={history} />
    </div>
  )
}

export default App
