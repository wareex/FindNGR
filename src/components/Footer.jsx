export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">
            <div className="footer-brand-icon">🔍</div>
            FindNGR
          </div>
          <p className="footer-desc">
            Nigeria's unified missing persons reporting platform — connecting families,
            communities, and law enforcement to bring every missing person home.
          </p>
        </div>
        <div>
          <div className="footer-col-title">Emergency</div>
          <div className="footer-links">
            <a className="footer-link" href="tel:112">🆘 112 — Emergency</a>
            <a className="footer-link" href="tel:199">🚒 199 — Fire Service</a>
            <a className="footer-link" href="tel:193">🚑 193 — Ambulance</a>
            <a className="footer-link" href="https://www.npf.gov.ng" target="_blank" rel="noreferrer">🏛️ NPF Official Site</a>
          </div>
        </div>
        <div>
          <div className="footer-col-title">Platform</div>
          <div className="footer-links">
            <button className="footer-link" onClick={() => document.querySelector('.board-section')?.scrollIntoView({ behavior: 'smooth' })}>Missing Board</button>
            <button className="footer-link" onClick={() => document.getElementById('action-section')?.scrollIntoView({ behavior: 'smooth' })}>Report Missing Person</button>
            <button className="footer-link" onClick={() => document.getElementById('action-section')?.scrollIntoView({ behavior: 'smooth' })}>I Found Someone</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} FindNGR — Built for Nigeria 🇳🇬</span>
        <div className="footer-ng-flag">
          <span style={{ color: '#008751', fontWeight: 700 }}>▌</span>
          <span style={{ color: '#ffffff', fontWeight: 700 }}>▌</span>
          <span style={{ color: '#008751', fontWeight: 700 }}>▌</span>
          <span>Nigerian Police Force data via OpenStreetMap contributors</span>
        </div>
      </div>
    </footer>
  )
}
