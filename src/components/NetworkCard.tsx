interface NetworkCardProps {
  uploadSpeed: number
  downloadSpeed: number
}

function formatSpeed(bytesPerSec: number): string {
  if (bytesPerSec < 1024) return `${bytesPerSec} B/s`
  if (bytesPerSec < 1024 * 1024) return `${(bytesPerSec / 1024).toFixed(1)} KB/s`
  return `${(bytesPerSec / (1024 * 1024)).toFixed(2)} MB/s`
}

export function NetworkCard({ uploadSpeed, downloadSpeed }: NetworkCardProps) {
  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
      <h3 className="text-sm font-medium text-slate-400 mb-4">Network Speed</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-sm text-slate-300">Download</span>
          </div>
          <span className="text-lg font-semibold text-green-400 font-mono">
            {formatSpeed(downloadSpeed)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span className="text-sm text-slate-300">Upload</span>
          </div>
          <span className="text-lg font-semibold text-blue-400 font-mono">
            {formatSpeed(uploadSpeed)}
          </span>
        </div>
      </div>
    </div>
  )
}
