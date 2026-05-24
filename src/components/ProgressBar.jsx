export default function ProgressBar({ current, total }) {
  return (
    <div className="progress-bar">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`progress-step ${i < current ? 'done' : i === current ? 'active' : ''}`}
        />
      ))}
    </div>
  )
}
