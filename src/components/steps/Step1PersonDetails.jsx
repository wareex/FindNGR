import { useState } from 'react'

const STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT - Abuja','Gombe',
  'Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos',
  'Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto',
  'Taraba','Yobe','Zamfara'
]

export default function Step1PersonDetails({ data, onChange, onNext }) {
  const [errors, setErrors] = useState({})
  const [photoPreview, setPhotoPreview] = useState(data.photoUrl || null)

  const set = (k, v) => onChange({ ...data, [k]: v })

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setErrors(er => ({ ...er, photo: 'Photo must be under 5MB' }))
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      const url = ev.target.result
      setPhotoPreview(url)
      onChange({ ...data, photoUrl: url, photoFile: file, photoName: file.name })
      setErrors(er => ({ ...er, photo: null }))
    }
    reader.readAsDataURL(file)
  }

  const validate = () => {
    const e = {}
    if (!data.name?.trim()) e.name = 'Full name is required'
    if (!data.age) e.age = 'Age is required'
    if (!data.gender) e.gender = 'Gender is required'
    if (!data.state) e.state = 'State is required'
    if (!data.lastSeen?.trim()) e.lastSeen = 'Last seen location is required'
    if (!data.dateLastSeen) e.dateLastSeen = 'Date last seen is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => { if (validate()) onNext() }

  return (
    <div>
      <div className="field-group">
        <label className="field-label">Photo of Missing Person</label>
        <div className="photo-upload-zone">
          <input type="file" accept="image/*" onChange={handlePhoto} />
          {photoPreview ? (
            <img src={photoPreview} alt="Preview" className="photo-preview" />
          ) : (
            <>
              <div className="photo-upload-icon">📷</div>
              <div className="photo-upload-label">
                <strong>Click to upload</strong> or drag & drop<br />
                JPG, PNG up to 5MB
              </div>
            </>
          )}
        </div>
        {errors.photo && <div className="field-error">{errors.photo}</div>}
      </div>

      <div className="field-group">
        <label className="field-label">Full Name <span className="field-required">*</span></label>
        <input className="field-input" placeholder="e.g. Chioma Adaeze Okafor" value={data.name || ''} onChange={e => set('name', e.target.value)} />
        {errors.name && <div className="field-error">{errors.name}</div>}
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label">Age <span className="field-required">*</span></label>
          <input className="field-input" type="number" min="0" max="120" placeholder="e.g. 34" value={data.age || ''} onChange={e => set('age', e.target.value)} />
          {errors.age && <div className="field-error">{errors.age}</div>}
        </div>
        <div className="field-group">
          <label className="field-label">Gender <span className="field-required">*</span></label>
          <select className="field-input" value={data.gender || ''} onChange={e => set('gender', e.target.value)}>
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {errors.gender && <div className="field-error">{errors.gender}</div>}
        </div>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label">State Last Seen <span className="field-required">*</span></label>
          <select className="field-input" value={data.state || ''} onChange={e => set('state', e.target.value)}>
            <option value="">Select state</option>
            {STATES.map(s => <option key={s}>{s}</option>)}
          </select>
          {errors.state && <div className="field-error">{errors.state}</div>}
        </div>
        <div className="field-group">
          <label className="field-label">LGA / Area</label>
          <input className="field-input" placeholder="e.g. Surulere" value={data.lga || ''} onChange={e => set('lga', e.target.value)} />
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">Last Known Location (specific) <span className="field-required">*</span></label>
        <input className="field-input" placeholder="e.g. Near Tejuosho Market, Yaba" value={data.lastSeen || ''} onChange={e => set('lastSeen', e.target.value)} />
        {errors.lastSeen && <div className="field-error">{errors.lastSeen}</div>}
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label">Date Last Seen <span className="field-required">*</span></label>
          <input className="field-input" type="date" max={new Date().toISOString().split('T')[0]} value={data.dateLastSeen || ''} onChange={e => set('dateLastSeen', e.target.value)} />
          {errors.dateLastSeen && <div className="field-error">{errors.dateLastSeen}</div>}
        </div>
        <div className="field-group">
          <label className="field-label">Skin Tone</label>
          <select className="field-input" value={data.complexion || ''} onChange={e => set('complexion', e.target.value)}>
            <option value="">Select</option>
            <option>Light</option>
            <option>Medium</option>
            <option>Dark</option>
            <option>Very Dark</option>
          </select>
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">Physical Description</label>
        <textarea className="field-input" placeholder="Height, build, hair, distinguishing marks, clothing worn when last seen…" value={data.description || ''} onChange={e => set('description', e.target.value)} />
      </div>

      <div className="step-nav">
        <span />
        <button className="btn-next" onClick={handleNext}>Next: Police Station →</button>
      </div>
    </div>
  )
}
