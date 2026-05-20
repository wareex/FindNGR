export default function Step5Success() {
  return (
    <div className="flow-section">
      <div className="success-card">
        <div className="checkmark-ring">✅</div>
        <h2 className="success-title">Report submitted</h2>
        <p className="success-sub">
          Your case has been filed officially. Community alerts are now live. You will receive SMS updates on any developments.
        </p>
        <div style={{ background: 'var(--gray)', borderRadius: 'var(--radius-sm)', padding: '14px', textAlign: 'left', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text3)', marginBottom: '8px' }}>
            Your case reference
          </div>
          <div style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text)', fontFamily: 'monospace' }}>
            LG/SUR/MP/2025-0441
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '4px' }}>
            Save this number. Use it to contact Insp. Obiora Nwosu directly.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn-xs btn-xs-primary" style={{ padding: '10px 16px', fontSize: '13px' }}>📤 Share alert</button>
          <button className="btn-xs" style={{ padding: '10px 16px', fontSize: '13px' }}>📋 Download report PDF</button>
          <button className="btn-xs" style={{ padding: '10px 16px', fontSize: '13px' }}>🔍 Track case status</button>
        </div>
      </div>
    </div>
  )
}
