import { useState } from 'react'
import ProgressBar from './ProgressBar.jsx'
import Step5Success from './steps/Step5Success.jsx'
import { fetchPoliceStations } from '../utils/policeStations.js'
import { NIGERIA_STATES } from '../utils/policeStations.js'
import ShareButtons from "./ShareButtons";

function genRef() {
  return 'SIG-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2,5).toUpperCase()
}

export default function FinderFlow({ onSubmit, onDone }) {
  const [step, setStep] = useState(0)
  const [refNum, setRefNum] = useState(null)
  const [data, setData] = useState({})
  const [stations, setStations] = useState([])
  const [loadingStations, setLoadingStations] = useState(false)
  const [errors, setErrors] = useState({})
  const [photoPreview, setPhotoPreview] = useState(null)

  const set = (k, v) => setData(d => ({ ...d, [k]: v }))

  const handleStateChange = async (state) => {
    set('state', state)
    set('selectedStation', null)
    if (state) {
      setLoadingStations(true)
      try {
        const results = await fetchPoliceStations(state)
        setStations(results)
      } catch (_) {
        setStations([])
      } finally {
        setLoadingStations(false)
      }
    }
  }

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setPhotoPreview(ev.target.result)
      set('photoUrl', ev.target.result)
    }
    reader.readAsDataURL(file)
  }

  const validateStep0 = () => {
    const e = {}
    if (!data.description?.trim()) e.description = 'Please describe the person you found'
    if (!data.location?.trim()) e.location = 'Location is required'
    if (!data.state) e.state = 'State is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep1 = () => {
    const e = {}
    if (!data.contactName?.trim() && !data.anonymous) e.contactName = 'Name required unless anonymous'
    if (!data.contactPhone?.trim() && !data.anonymous) e.contactPhone = 'Phone required unless anonymous'
    if (!data.consent) e.consent = 'Please confirm your consent'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validateStep1()) return
    const ref = genRef()
    setRefNum(ref)
    onSubmit({
      id: ref,
      description: data.description,
      location: data.location,
      state: data.state,
      condition: data.condition,
      photoUrl: data.photoUrl || null,
      anonymous: data.anonymous || false,
      contactName: data.anonymous ? 'Anonymous' : data.contactName,
      contactPhone: data.anonymous ? '' : data.contactPhone,
      station: data.selectedStation?.name,
      reportedAt: new Date().toISOString(),
      ref,
    })
    setStep(2)
  }

  return (
    <div className="flow-wrapper">
      <div className="flow-inner">
        <div className="flow-card">
          {step < 2 ? (
            <>
              <ProgressBar current={step} total={2} />
              {step === 0 && (
                <>
                  <h2 className="flow-title">Describe Who You Found</h2>
                  <p className="flow-sub">Share details about the person you've encountered. Your sighting could reunite a family.</p>

                  <div className="anon-banner">
                    <div className="anon-banner-icon">🔒</div>
                    <div className="anon-banner-text">
                      You can submit this sighting <strong>anonymously</strong>. Toggle the anonymous option on the next step if you prefer.
                    </div>
                  </div>

                  <div className="field-group">
                    <label className="field-label">Photo (optional)</label>
                    <div className="photo-upload-zone">
                      <input type="file" accept="image/*" onChange={handlePhoto} />
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="photo-preview" />
                      ) : (
                        <>
                          <div className="photo-upload-icon">📷</div>
                          <div className="photo-upload-label"><strong>Click to upload</strong> a photo if you have one</div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="field-group">
                    <label className="field-label">Describe the Person <span className="field-required">*</span></label>
                    <textarea className="field-input" placeholder="Gender, approximate age, height, clothing, distinguishing features, physical or mental condition…" value={data.description || ''} onChange={e => set('description', e.target.value)} />
                    {errors.description && <div className="field-error">{errors.description}</div>}
                  </div>

                  <div className="field-group">
                    <label className="field-label">Exact Location Where Seen <span className="field-required">*</span></label>
                    <input className="field-input" placeholder="e.g. Near Shoprite, Lekki Phase 1" value={data.location || ''} onChange={e => set('location', e.target.value)} />
                    {errors.location && <div className="field-error">{errors.location}</div>}
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label">State <span className="field-required">*</span></label>
                      <select className="field-input" value={data.state || ''} onChange={e => handleStateChange(e.target.value)}>
                        <option value="">Select state</option>
                        {NIGERIA_STATES.map(s => <option key={s}>{s}</option>)}
                      </select>
                      {errors.state && <div className="field-error">{errors.state}</div>}
                    </div>
                    <div className="field-group">
                      <label className="field-label">Condition / Appearance</label>
                      <select className="field-input" value={data.condition || ''} onChange={e => set('condition', e.target.value)}>
                        <option value="">Select</option>
                        <option>Appears distressed</option>
                        <option>Appears confused / disoriented</option>
                        <option>Appears injured</option>
                        <option>Appears unwell</option>
                        <option>Appears okay</option>
                        <option>Unconscious / needs help</option>
                      </select>
                    </div>
                  </div>

                  {data.state && (
                    <div className="field-group">
                      <label className="field-label">Nearest Police Station (auto-detected)</label>
                      {loadingStations ? (
                        <div className="station-loading"><span className="spinner" /> Loading nearby stations…</div>
                      ) : (
                        <div className="stations-list" style={{ maxHeight: 200 }}>
                          {stations.map((s, i) => (
                            <div
                              key={i}
                              className={`station-card ${data.selectedStation?.name === s.name ? 'selected' : ''}`}
                              onClick={() => set('selectedStation', s)}
                            >
                              <div className="station-card-name">🏢 {s.name}</div>
                              <div className="station-card-detail">{s.address}{s.dist != null ? ` · ~${s.dist} km` : ''}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="step-nav">
                    <span />
                    <button className="btn-next" onClick={() => { if (validateStep0()) setStep(1) }}>
                      Next: Your Contact →
                    </button>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <h2 className="flow-title">Your Contact Info</h2>
                  <p className="flow-sub">Help authorities follow up on your sighting. You may remain anonymous.</p>

                  <label className="checkbox-group" style={{ marginBottom: 20 }}>
                    <input type="checkbox" checked={data.anonymous || false} onChange={e => set('anonymous', e.target.checked)} />
                    <span className="checkbox-label">Submit anonymously — my name and phone will not be recorded or shared</span>
                  </label>

                  {!data.anonymous && (
                    <>
                      <div className="field-group">
                        <label className="field-label">Your Name <span className="field-required">*</span></label>
                        <input className="field-input" placeholder="Your full name" value={data.contactName || ''} onChange={e => set('contactName', e.target.value)} />
                        {errors.contactName && <div className="field-error">{errors.contactName}</div>}
                      </div>
                      <div className="field-group">
                        <label className="field-label">Phone Number <span className="field-required">*</span></label>
                        <input className="field-input" type="tel" placeholder="+234 800 000 0000" value={data.contactPhone || ''} onChange={e => set('contactPhone', e.target.value)} />
                        {errors.contactPhone && <div className="field-error">{errors.contactPhone}</div>}
                      </div>
                    </>
                  )}

                  <label className="checkbox-group" style={{ marginBottom: 16 }}>
                    <input type="checkbox" checked={data.consent || false} onChange={e => set('consent', e.target.checked)} />
                    <span className="checkbox-label">
                      I confirm this sighting is genuine and I consent to this information being used to help reunite a missing person with their family.
                    </span>
                  </label>
                  {errors.consent && <div className="field-error" style={{ marginBottom: 12 }}>{errors.consent}</div>}

                  <div className="step-nav">
                    <button className="btn-back" onClick={() => setStep(0)}>← Back</button>
                    <button className="btn-submit" onClick={handleSubmit}>👁️ Submit Sighting</button>
                  </div>
                </>
              )}
            </>
          ) : (
            <Step5Success refNum={refNum} onDone={onDone} type="sighting" />
          )}
        </div>
      </div>
    </div>
  )
}
