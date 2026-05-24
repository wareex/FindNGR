import ShareButtons from "../ShareButtons";

export default function Step5Success({ refNum, onDone, type = 'report', formData = {} }) {
  return (
    <div className="success-screen">
      <div className="success-icon">{type === 'report' ? '✅' : '🙏'}</div>
      <h2 className="success-title">
        {type === 'report' ? 'Report Submitted' : 'Sighting Reported'}
      </h2>
      <p className="success-sub">
        {type === 'report'
          ? 'Your missing person report has been recorded and is now visible on the Missing Persons Board. Relevant authorities have been notified.'
          : 'Your sighting has been recorded and is now visible on the board. Relevant contacts will be alerted.'
        }
      </p>
      <div className="success-ref">Reference: {refNum}</div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px', marginBottom: 28, textAlign: 'left', fontSize: '.9rem' }}>
        <div style={{ fontWeight: 600, marginBottom: 12, color: 'var(--ink)' }}>What happens next?</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--muted)' }}>
          <div>📋 Your report is live on the Missing Persons Board</div>
          <div>📞 Notify the selected police station directly at <strong style={{ color: 'var(--green-dark)' }}>112</strong></div>
          <div>📣 Share the case on social media to widen the search</div>
          <div>🔄 Return here to submit updates if new information emerges</div>
        </div>
      </div>

      {/* ── Share Buttons ── */}
      <ShareButtons
        personName={formData?.fullName || formData?.name || "the missing person"}
        reportId={refNum || ""}
      />

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
        <button className="btn-done" onClick={onDone}>Back to Board</button>
        
          href={`tel:112`}
          style={{ background: 'var(--red)', color: '#fff', padding: '13px 28px', borderRadius: 10, fontSize: '1rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          📞 Call 112
        </a>
      </div>
    </div>
  )
}