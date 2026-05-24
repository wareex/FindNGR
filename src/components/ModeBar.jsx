export default function ModeBar({ mode, setMode }) {
  return (
    <div className="mode-bar">
      <div className="mode-bar-inner">
        <button
          className={`mode-tab ${mode === 'report' ? 'active-report' : ''}`}
          onClick={() => setMode(mode === 'report' ? null : 'report')}
        >
          🚨 Report a Missing Person
        </button>
        <button
          className={`mode-tab ${mode === 'finder' ? 'active-finder' : ''}`}
          onClick={() => setMode(mode === 'finder' ? null : 'finder')}
        >
          👁️ I Found Someone
        </button>
      </div>
    </div>
  )
}
