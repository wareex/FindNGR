import { useState } from 'react'

export default function Navbar({ onMode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleNavClick(mode) {
    setMenuOpen(false)
    onMode(mode)
  }

  return (
    <nav className={menuOpen ? 'nav-menu-open' : ''}>
      <div className="nav-logo">Find<span>NGR</span></div>

      {/* Desktop links */}
      <div className="nav-links nav-links-desktop">
        <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('report') }}>Report</a>
        <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('finder') }}>Found someone?</a>
        <a href="#">Search</a>
        <a href="#">Alerts</a>
      </div>

      <div className="nav-hotline">Hotline: 0800-FIND-NGR</div>

      {/* Hamburger button — mobile only */}
      <button
        className="nav-hamburger"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span /><span /><span />
      </button>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="nav-mobile-menu">
          <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('report') }}>📋 Report missing person</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('finder') }}>🔍 Found someone?</a>
          <a href="#">🔎 Search</a>
          <a href="#">🔔 Alerts</a>
        </div>
      )}
    </nav>
  )
}
