const STEPS = [
  { label: 'Person details' },
  { label: 'Police station' },
  { label: 'Police POC' },
  { label: 'Review & submit' },
]

export default function ProgressBar({ currentStep, onGoStep }) {
  return (
    <div className="progress-bar">
      {STEPS.map((s, i) => {
        const n = i + 1
        const isDone = n < currentStep
        const isActive = n === currentStep
        return (
          <div
            key={n}
            className={`progress-step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
            onClick={() => isDone && onGoStep(n)}
            style={{ cursor: isDone ? 'pointer' : isActive ? 'default' : 'not-allowed' }}
          >
            <div className="step-circle">
              {isDone ? '✓' : n}
            </div>
            <span className="step-label">{s.label}</span>
          </div>
        )
      })}
    </div>
  )
}
