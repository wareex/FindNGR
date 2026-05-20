export default function Step4Review({ onSubmit, onBack }) {
  return (
    <div className="flow-section">
      <div className="card" style={{ marginBottom: '1rem' }}>
        <div className="card-header">
          <div className="card-title-wrap">
            <div className="card-title">Review & confirm submission</div>
            <div className="card-subtitle">Once submitted, alerts will be sent automatically</div>
          </div>
          <div className="card-icon ci-green">✅</div>
        </div>
        <div className="card-inner">

          <div className="section-label">Missing person summary</div>
          <div style={{ background: 'var(--gray)', borderRadius: 'var(--radius-sm)', padding: '14px', marginBottom: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '8px', background: 'var(--gray2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>
              👤
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '500', color: 'var(--text)', marginBottom: '2px' }}>
                Amaka Okonkwo{' '}
                <span className="badge badge-red badge-pulse" style={{ marginLeft: '4px' }}>Active report</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text3)' }}>
                Female · 9 years old · Last seen Surulere, Lagos · 2 days ago
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '2px' }}>
                Clothing: Red dress, white sneakers
              </div>
            </div>
          </div>

          <div className="section-label">Police documentation</div>
          <div style={{ background: 'var(--green-pale)', border: '1px solid rgba(15,110,86,0.2)', borderRadius: 'var(--radius-sm)', padding: '12px', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '20px' }}>✅</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--green)' }}>
                Officially documented · Surulere Police Station
              </div>
              <div style={{ fontSize: '12px', color: 'var(--green)', opacity: '.8' }}>
                POC: Insp. Obiora Nwosu · Ref: LG/SUR/MP/2025-0441
              </div>
            </div>
          </div>

          <div className="section-label">Alerts that will fire on submission</div>
          <div className="evidence-list">
            <div className="ev-row">
              <span className="ev-icon">📱</span>
              <span className="ev-label">SMS blast via Africa's Talking — community in Surulere, Lagos</span>
              <span className="ev-chip ev-auto">Auto</span>
            </div>
            <div className="ev-row">
              <span className="ev-icon">🔔</span>
              <span className="ev-label">Push notification to all opted-in FindNGR app users in Lagos State</span>
              <span className="ev-chip ev-auto">Auto</span>
            </div>
            <div className="ev-row">
              <span className="ev-icon">🤖</span>
              <span className="ev-label">Face indexed in AWS Rekognition — active matching begins immediately</span>
              <span className="ev-chip ev-auto">Auto</span>
            </div>
            <div className="ev-row">
              <span className="ev-icon">📍</span>
              <span className="ev-label">Last seen location pinned on public map — anonymous to reporter</span>
              <span className="ev-chip ev-auto">Auto</span>
            </div>
            <div className="ev-row">
              <span className="ev-icon">🚨</span>
              <span className="ev-label">Police POC notified via email + SMS with case reference</span>
              <span className="ev-chip ev-auto">Auto</span>
            </div>
          </div>

          <div className="btn-row">
            <button className="btn-secondary" onClick={onBack}>← Back</button>
            <button className="btn-green" onClick={onSubmit}>🚨 Submit official report</button>
          </div>
        </div>
      </div>
    </div>
  )
}
