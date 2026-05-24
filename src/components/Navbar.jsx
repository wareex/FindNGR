export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo">
          <div className="navbar-logo-icon">🔍</div>
          FindNGR
          <span className="navbar-badge">LIVE</span>
        </div>
        <div className="navbar-links">
          <button className="navbar-link" onClick={() => document.querySelector('.board-section')?.scrollIntoView({ behavior: 'smooth' })}>
            Missing Board
          </button>
          <button className="navbar-link" onClick={() => document.getElementById('action-section')?.scrollIntoView({ behavior: 'smooth' })}>
            Report / Finder
          </button>
          <a className="navbar-link" href="https://www.npf.gov.ng" target="_blank" rel="noreferrer">NPF Portal</a>
          <a className="navbar-emergency" href="tel:112">🆘 112 Emergency</a>
        </div>
      </div>
    </nav>
  )
}
