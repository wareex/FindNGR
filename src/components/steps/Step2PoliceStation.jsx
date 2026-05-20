import { useState } from 'react'

const STATIONS = [
  {
    name: 'Surulere Police Station',
    badge: true,
    meta: "Area 'E' Command · Adeniran Ogunsanya St, Surulere, Lagos",
    dist: '📍 0.8 km · ~4 min drive',
    phone: '0803 000 0001',
    recommended: true,
  },
  {
    name: 'Lagos Island Division',
    meta: 'Force CID Annex · Broad Street, Lagos Island',
    dist: '📍 2.4 km · ~12 min drive',
    phone: '0803 000 0002',
  },
  {
    name: 'Apapa Police Station',
    meta: "Area 'B' Command · Wharf Road, Apapa",
    dist: '📍 4.1 km · ~20 min drive',
    phone: '0803 000 0003',
  },
]

export default function Step2PoliceStation({ onNext, onBack }) {
  const [selected, setSelected] = useState(0)

  return (
    <div className="flow-section">
      <div className="card">
        <div className="card-header">
          <div className="card-title-wrap">
            <div className="card-title">Nearest police station</div>
            <div className="card-subtitle">Auto-detected from the last seen location you provided</div>
          </div>
          <div className="card-icon ci-navy">🏛️</div>
        </div>
        <div className="card-inner">

          <div className="map-mock">
            <div className="map-bg-dots">
              <div className="mdot mdot-blue" style={{ top: '20%', left: '15%' }} />
              <div className="mdot mdot-blue" style={{ top: '60%', left: '25%' }} />
              <div className="mdot mdot-blue" style={{ top: '40%', left: '70%' }} />
              <div className="mdot mdot-blue" style={{ top: '75%', left: '60%' }} />
              <div className="mdot mdot-red" style={{ top: '45%', left: '45%' }} />
            </div>
            <div className="map-pin-label">
              <div className="map-pin-icon">📍</div>
              <div>
                <div className="map-pin-text">Last seen location</div>
                <div className="map-pin-name">Surulere, Lagos · Google Maps</div>
              </div>
            </div>
          </div>

          <div className="section-label" style={{ marginBottom: '10px' }}>
            Stations near last seen location — select one to visit
          </div>

          {STATIONS.map((s, i) => (
            <div
              key={i}
              className={`station-card ${selected === i ? 'selected' : ''}`}
              onClick={() => setSelected(i)}
            >
              <div
                className="station-avatar"
                style={i !== 0 ? { background: 'var(--gray)', color: 'var(--text3)' } : {}}
              >
                🏛️
              </div>
              <div style={{ flex: 1 }}>
                <div className="station-name">
                  {s.name}
                  {s.recommended && (
                    <span className="badge badge-blue" style={{ marginLeft: '6px' }}>Recommended</span>
                  )}
                </div>
                <div className="station-meta">{s.meta}</div>
                <div>
                  <span
                    className="station-dist"
                    style={i !== 0 ? { background: 'var(--gray)', color: 'var(--text3)' } : {}}
                  >
                    {s.dist}
                  </span>
                </div>
                <div className="station-actions">
                  <button className="btn-xs btn-xs-primary">🗺️ Get directions</button>
                  <button className="btn-xs">📞 Call: {s.phone}</button>
                  <button className="btn-xs">📋 Station details</button>
                </div>
              </div>
            </div>
          ))}

          <div className="qr-box">
            <div className="qr-visual">▦</div>
            <div>
              <div className="qr-title">Your case QR code is ready</div>
              <div className="qr-sub">
                Show this at the station front desk. The officer will scan it to pull up your case instantly — no manual re-entry needed. Valid for 48 hours.
              </div>
            </div>
          </div>

          <div className="warn-block" style={{ marginTop: '12px' }}>
            <span className="warn-icon">⚠️</span>
            <span className="warn-text">
              You must visit the station in person to complete official documentation. This cannot be done remotely.
            </span>
          </div>

          <div className="btn-row" style={{ marginTop: '8px' }}>
            <button className="btn-secondary" onClick={onBack}>← Back</button>
            <button className="btn-primary" onClick={onNext}>I've visited the station →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
