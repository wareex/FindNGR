import { useState } from 'react'

export default function Step3POCEntry({ data, onChange, onNext, onBack }) {
  const [errors, setErrors] = useState({})

  const set = (k, v) => onChange({ ...data, [k]: v })

  const validate = () => {
    const e = {}
    if (!data.pocName?.trim()) e.pocName = 'Contact name is required'
    if (!data.pocPhone?.trim()) e.pocPhone = 'Phone number is required'
    else if (!/^[\d\s\+\-\(\)]{10,15}$/.test(data.pocPhone.trim())) e.pocPhone = 'Enter a valid Nigerian phone number'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  return (
    <div>
      <p style={{ color: 'var(--muted)', fontSize: '.9rem', marginBottom: 24, lineHeight: 1.6 }}>
        Provide contact details for the person reporting. This helps authorities reach you for follow-up.
        Your information is kept confidential and only shared with relevant authorities.
      </p>

      <div className="field-group">
        <label className="field-label">Your Full Name <span className="field-required">*</span></label>
        <input className="field-input" placeholder="Your full name" value={data.pocName || ''} onChange={e => set('pocName', e.target.value)} />
        {errors.pocName && <div className="field-error">{errors.pocName}</div>}
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label">Phone Number <span className="field-required">*</span></label>
          <input className="field-input" type="tel" placeholder="+234 800 000 0000" value={data.pocPhone || ''} onChange={e => set('pocPhone', e.target.value)} />
          {errors.pocPhone && <div className="field-error">{errors.pocPhone}</div>}
        </div>
        <div className="field-group">
          <label className="field-label">WhatsApp Number</label>
          <input className="field-input" type="tel" placeholder="Same or different number" value={data.pocWhatsapp || ''} onChange={e => set('pocWhatsapp', e.target.value)} />
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">Email Address</label>
        <input className="field-input" type="email" placeholder="your@email.com" value={data.pocEmail || ''} onChange={e => set('pocEmail', e.target.value)} />
      </div>

      <div className="field-group">
        <label className="field-label">Your Relationship to Missing Person</label>
        <select className="field-input" value={data.relationship || ''} onChange={e => set('relationship', e.target.value)}>
          <option value="">Select relationship</option>
          <option>Parent</option>
          <option>Spouse / Partner</option>
          <option>Sibling</option>
          <option>Child</option>
          <option>Relative</option>
          <option>Friend</option>
          <option>Colleague</option>
          <option>Neighbour</option>
          <option>Other</option>
        </select>
      </div>

      <div className="field-group">
        <label className="field-label">Additional Information / Circumstances</label>
        <textarea className="field-input" placeholder="Any other relevant details: events before disappearance, associates, vehicles, social media, etc." value={data.additionalInfo || ''} onChange={e => set('additionalInfo', e.target.value)} />
      </div>

      <label className="checkbox-group" style={{ marginBottom: 16 }}>
        <input type="checkbox" checked={data.consent || false} onChange={e => set('consent', e.target.checked)} />
        <span className="checkbox-label">
          I confirm the information provided is accurate to the best of my knowledge, and I consent to this report being shared with Nigerian law enforcement authorities and made visible on the FindNGR public board.
        </span>
      </label>

      <div className="step-nav">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <button
          className="btn-next"
          onClick={() => {
            if (!data.consent) { alert('Please confirm your consent to proceed.'); return }
            if (validate()) onNext()
          }}
        >
          Review Report →
        </button>
      </div>
    </div>
  )
}
