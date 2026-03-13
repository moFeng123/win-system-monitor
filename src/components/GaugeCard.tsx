interface GaugeCardProps {
  title: string
  value: number
  unit: string
  color: string
  subtitle?: string
}

export function GaugeCard({ title, value, unit, color, subtitle }: GaugeCardProps) {
  const clampedValue = Math.min(100, Math.max(0, value))
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference

  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 flex flex-col items-center border border-slate-700/50">
      <h3 className="text-sm font-medium text-slate-400 mb-4">{title}</h3>
      <div className="relative w-28 h-28">
        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="#1e293b"
            strokeWidth="8"
          />
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{value.toFixed(1)}</span>
          <span className="text-xs text-slate-400">{unit}</span>
        </div>
      </div>
      {subtitle && (
        <p className="text-xs text-slate-500 mt-3">{subtitle}</p>
      )}
    </div>
  )
}
