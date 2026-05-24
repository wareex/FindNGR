export default function Step4Review({ personData, stationData, contactData, onSubmit, onBack }) {
  const rows = [
    ['Name', personData.name],
    ['Age', personData.age],
    ['Gender', personData.gender],
    ['State', personData.state],
    ['LGA / Area', personData.lga || '—'],
    ['Last Seen Location', personData.lastSeen],
    ['Date Last Seen', personData.dateLastSeen],
    ['Complexion', personData.complexion || '—'],
    ['Police Station', stationData.selectedStation?.name || '—'],
    ['Police Reported?', stationData.policeReported || '—'],
    ['Case Reference', stationData.caseRef || '—'],
    ['Reporter Name', contactData.pocName],
    ['Reporter Phone', contactData.pocPhone],
    ['Relationship', contactData.relationship || '—'],
  ]

  return (
    <div>
      <p style={{ color: 'var(--muted)', fontSize: '.9rem', marginBottom: 24 }}>
        Please review your report before submitting. Once submitted, the case will appear on the Missing Persons Board immediately.
      </p>

      {personData.photoUrl && (
        <div style={{ marginBottom: 20, textAlign: 'center' }}>
          <img src={personData.photoUrl} alt="Missing person" className="review-photo-preview" style={{ width: 120, height: 120, margin: '0 auto' }} />
        </div>
      )}

      <div className="review-box">
        {rows.map(([label, value]) => value ? (
          <div className="review-row" key={label}>
            <span className="review-label">{label}</span>
            <span className="review-value">{value}</span>
          </div>
        ) : null)}
      </div>

      {contactData.additionalInfo && (
        <div className="review-box">
          <div style={{ fontWeight: 500, fontSize: '.85rem', marginBottom: 8, color: 'var(--muted)' }}>Additional Info</div>
          <div style={{ fontSize: '.9rem', color: 'var(--ink)' }}>{contactData.additionalInfo}</div>
        </div>
      )}

      <div style={{ background: '#fde8e8', border: '1px solid #f5c6c6', borderRadius: 10, padding: '14px 16px', fontSize: '.85rem', color: '#7b1e1e', marginBottom: 24 }}>
        ⚠️ By submitting you confirm this report is truthful. Filing a false missing persons report is a criminal offence under Nigerian law.
      </div>

      <div className="step-nav">
        <button className="btn-back" onClick={onBack}>← Edit</button>
        <button className="btn-submit" onClick={onSubmit}>🚨 Submit Report</button>
      </div>
    </div>
  )
}
