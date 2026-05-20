export default function Hero({ onMode }) {
  return (
    <div className="hero">
      <div className="hero-tag">🇳🇬 Nigeria Missing Persons Registry</div>
      <h1>Every second counts.<br /><em>Let's find them together.</em></h1>
      <p className="hero-sub">
        Report a missing person, connect with police, or anonymously share a sighting — all in one secure platform.
      </p>
      <div className="hero-ctas">
        <button className="btn-hero-primary" onClick={() => onMode('report')}>
          Report a missing person
        </button>
        <button className="btn-hero-secondary" onClick={() => onMode('finder')}>
          I found someone →
        </button>
      </div>
    </div>
  )
}
