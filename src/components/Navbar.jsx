export default function Navbar({ onMode }) {
  return (
    <nav>
      <div className="nav-logo">Find<span>NGR</span></div>
      <div className="nav-links">
        <a href="#" onClick={(e) => { e.preventDefault(); onMode('report'); }}>Report</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onMode('finder'); }}>Found someone?</a>
        <a href="#">Search</a>
        <a href="#">Alerts</a>
      </div>
      <div className="nav-hotline">Hotline: 0800-FIND-NGR</div>
    </nav>
  )
}
