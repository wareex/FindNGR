import { useRef, useState } from 'react'

export default function Step3POCEntry({ onNext, onBack }) {
  const [digits, setDigits] = useState(['4', '7', '2', '', '', ''])
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]

  function handleDigit(i, val) {
    const updated = [...digits]
    updated[i] = val.slice(-1)
    setDigits(updated)
    if (val && i < 5) refs[i + 1].current?.focus()
  }

  return (
    <div className="flow-section">
      <div className="card">
        <div className="card-header">
          <div className="card-title-wrap">
            <div className="card-title">Enter police verification code</div>
            <div className="card-subtitle">The desk officer will give you a 6-digit code after documentation</div>
          </div>
          <div className="card-icon ci-blue">🔐</div>
        </div>
        <div className="card-inner">

          <div className="info-block">
            <span className="info-icon">ℹ️</span>
            <span className="info-text">
              The officer at your selected station will issue a 6-digit one-time code after logging your case. Enter it below to attach the verified police contact to your missing person's profile.
            </span>
          </div>

          <div className="code-entry">
            <div className="code-label">6-digit verification code from station officer</div>
            <div className="code-inputs">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={refs[i]}
                  className={`code-digit ${d ? 'filled' : ''}`}
                  type="text"
                  maxLength={1}
                  value={d}
                  placeholder="·"
                  onChange={(e) => handleDigit(i, e.target.value)}
                />
              ))}
            </div>
          </div>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">Once verified, your assigned police point of contact</span>
            <div className="divider-line" />
          </div>

          <div className="poc-verified-card" style={{ marginBottom: '1rem' }}>
            <div className="poc-shield">🛡️</div>
            <div style={{ flex: 1 }}>
              <div className="poc-name">Insp. Obiora Nwosu</div>
              <div className="poc-role">
                Missing Persons Unit · Surulere Division{' '}
                <span className="badge badge-green" style={{ marginLeft: '4px' }}>✓ Verified</span>
              </div>
              <div className="poc-detail-row">
                <span className="poc-detail-icon">#</span>
                Case ref: <span>LG/SUR/MP/2025-0441</span>
              </div>
              <div className="poc-detail-row">
                <span className="poc-detail-icon">📞</span>
                Direct line: <span>+234 801 234 5678</span>
              </div>
              <div className="poc-detail-row">
                <span className="poc-detail-icon">📧</span>
                Email: <span>o.nwosu@npf.gov.ng</span>
              </div>
              <div className="poc-detail-row">
                <span className="poc-detail-icon">🕐</span>
                On duty: <span>Mon–Fri, 08:00–18:00</span>
              </div>
            </div>
          </div>

          <div className="info-block">
            <span className="info-icon">🔒</span>
            <span className="info-text">
              This POC contact is added to the missing person's public profile. Anyone who finds the person will be directed <strong>only</strong> to this contact — your details stay hidden.
            </span>
          </div>

          <div className="btn-row">
            <button className="btn-secondary" onClick={onBack}>← Back</button>
            <button className="btn-primary" onClick={onNext}>Attach POC & continue →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
