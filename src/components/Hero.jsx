export default function Hero({ onCTA }) {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-tag">
          <span className="hero-tag-dot" />
          Nigeria Missing Persons Platform
        </div>
        <h1>
          Help us bring <em>every missing person</em> home safely
        </h1>
        <p className="hero-sub">
          Report a missing person, connect with the nearest police station, or
          anonymously share a sighting — all in one secure platform built for Nigeria.
        </p>
        <div className="hero-actions">
          <button className="btn-report" onClick={() => onCTA('report')}>
            🚨 Report Missing Person
          </button>
          <button className="btn-finder" onClick={() => onCTA('finder')}>
            👁️ I Found Someone
          </button>
        </div>
        <div className="hero-stats">
          <div>
            <div className="hero-stat-num">112</div>
            <div className="hero-stat-label">Emergency Line</div>
          </div>
          <div>
            <div className="hero-stat-num">36</div>
            <div className="hero-stat-label">States Covered</div>
          </div>
          <div>
            <div className="hero-stat-num">Free</div>
            <div className="hero-stat-label">Always Free</div>
          </div>
        </div>
      </div>
    </section>
  )
}
