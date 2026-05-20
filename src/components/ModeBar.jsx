export default function ModeBar({ mode, onMode }) {
  return (
    <div className="mode-bar">
      <button
        className={`mode-btn ${mode === 'report' ? 'active' : ''}`}
        onClick={() => onMode('report')}
      >
        📋 Report missing person
      </button>
      <button
        className={`mode-btn ${mode === 'finder' ? 'active' : ''}`}
        onClick={() => onMode('finder')}
      >
        🔍 I found someone
      </button>
    </div>
  )
}
