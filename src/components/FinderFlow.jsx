import { useState } from 'react'

export default function FinderFlow() {
  const [pocRevealed, setPocRevealed] = useState(false)

  return (
    <div>
      <div className="flow-header">
        <h2>I found someone</h2>
        <p>You stay completely anonymous. Your submission goes directly to the police — nobody else.</p>
      </div>

      <div className="card" style={{ borderColor: 'rgba(26,95,186,0.3)' }}>
        <div className="anon-header">
          <div className="anon-icon">🛡️</div>
          <div>
            <div className="anon-title">Anonymous submission — your identity is never recorded</div>
            <div className="anon-sub">You will only receive the police point of contact after submitting. Nothing else.</div>
          </div>
        </div>
        <div className="card-inner">

          <div className="section-label" style={{ marginBottom: '8px' }}>What you can and cannot see</div>
          <div className="privacy-rules">
            <div className="pr-item pr-blocked">
              <div className="pr-icon">🚫</div>
              <div>
                <div className="pr-rule-label">Hidden from you</div>
                <div className="pr-text">Reporter's name, family contacts, home address, personal story, other tipsters</div>
              </div>
            </div>
            <div className="pr-item pr-allowed">
              <div className="pr-icon">✅</div>
              <div>
                <div className="pr-rule-label">You receive only</div>
                <div className="pr-text">Police officer name, direct phone number, and case reference — nothing more</div>
              </div>
            </div>
          </div>

          <div className="section-label" style={{ marginBottom: '8px' }}>Photo of the person you found</div>
          <div className="finder-photo-zone">
            <div className="fpz-icon">📸</div>
            <div className="fpz-text">Take a photo or upload from your device</div>
            <div className="fpz-sub">Goes directly to police evidence — never posted publicly · Cloudinary secure storage</div>
          </div>

          <div className="section-label" style={{ marginBottom: '8px' }}>Your exact location</div>
          <div className="location-auto">
            <div className="la-icon">📡</div>
            <div>
              <div className="la-title">GPS captured automatically</div>
              <div className="la-coords">6.5022° N, 3.3529° E · ±4m accuracy · Surulere, Lagos NG</div>
              <span className="la-pill">⚡ Auto-captured — cannot be edited</span>
            </div>
          </div>

          <div className="section-label" style={{ marginBottom: '8px' }}>Evidence automatically logged on submission</div>
          <div className="evidence-list">
            <div className="ev-row">
              <span className="ev-icon">📷</span>
              <span className="ev-label">Photo uploaded to Cloudinary with tamper-evident SHA-256 hash</span>
              <span className="ev-chip ev-auto">Auto</span>
            </div>
            <div className="ev-row">
              <span className="ev-icon">📍</span>
              <span className="ev-label">GPS coordinates + timestamp locked to evidence record</span>
              <span className="ev-chip ev-auto">Auto</span>
            </div>
            <div className="ev-row">
              <span className="ev-icon">📱</span>
              <span className="ev-label">Device fingerprint recorded server-side — hidden from you</span>
              <span className="ev-chip ev-auto">Auto</span>
            </div>
            <div className="ev-row">
              <span className="ev-icon">🤖</span>
              <span className="ev-label">AWS Rekognition face-match run against missing persons index</span>
              <span className="ev-chip ev-ok">Pending</span>
            </div>
            <div className="ev-row">
              <span className="ev-icon">🚨</span>
              <span className="ev-label">Police POC alerted instantly by SMS + push notification</span>
              <span className="ev-chip ev-ok">Sent on submit</span>
            </div>
          </div>

          <button className="btn-navy" onClick={() => setPocRevealed(true)} style={{ marginBottom: '1rem' }}>
            🔒 Submit — stay anonymous
          </button>

          {pocRevealed && (
            <div className="poc-reveal">
              <div className="poc-reveal-label">Your submission has been sent to the police. Here is your only contact:</div>
              <div className="poc-reveal-contact">
                <div className="poc-reveal-avatar">IO</div>
                <div>
                  <div className="poc-reveal-name">Insp. Obiora Nwosu · Surulere Division</div>
                  <div className="poc-reveal-num">📞 +234 801 234 5678</div>
                  <div className="poc-reveal-ref">Case ref: LG/SUR/MP/2025-0441</div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
