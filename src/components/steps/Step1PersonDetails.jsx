export default function Step1PersonDetails({ onNext }) {
  return (
    <div className="flow-section">
      <div className="card">
        <div className="card-header">
          <div className="card-title-wrap">
            <div className="card-title">Missing person's information</div>
            <div className="card-subtitle">All fields marked are required to file a report</div>
          </div>
          <div className="card-icon ci-red">👤</div>
        </div>
        <div className="card-inner">

          <div className="section-label">Personal details</div>
          <div className="form-grid form-grid-2" style={{ marginBottom: '16px' }}>
            <div className="field">
              <label>Full name *</label>
              <input type="text" placeholder="e.g. Amaka Okonkwo" />
            </div>
            <div className="field">
              <label>Date of birth *</label>
              <input type="date" />
            </div>
            <div className="field">
              <label>Gender *</label>
              <select>
                <option value="">Select gender</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field">
              <label>Nationality</label>
              <input type="text" placeholder="e.g. Nigerian" defaultValue="Nigerian" />
            </div>
          </div>

          <div className="section-label">Last known location</div>
          <div className="form-grid form-grid-2" style={{ marginBottom: '16px' }}>
            <div className="field">
              <label>Area / Street *</label>
              <input type="text" placeholder="e.g. Adeniran Ogunsanya St" />
            </div>
            <div className="field">
              <label>City / LGA *</label>
              <input type="text" placeholder="e.g. Surulere, Lagos" />
            </div>
            <div className="field">
              <label>Date last seen *</label>
              <input type="date" />
            </div>
            <div className="field">
              <label>Time last seen</label>
              <input type="time" />
            </div>
          </div>

          <div className="section-label">Physical description</div>
          <div className="form-grid" style={{ marginBottom: '16px' }}>
            <div className="field">
              <label>Clothing worn when last seen *</label>
              <input type="text" placeholder="e.g. Red dress, white sneakers" />
            </div>
            <div className="field">
              <label>Description / distinguishing features</label>
              <textarea placeholder="Height, complexion, marks, hair, any unique features..." />
            </div>
          </div>

          <div className="section-label">Photo upload</div>
          <div className="upload-box" style={{ marginBottom: '16px' }}>
            <div className="upload-icon">📷</div>
            <div className="upload-text">Upload a recent photo of the missing person</div>
            <div className="upload-sub">JPG, PNG up to 10MB · Stored securely on Cloudinary · Used for face-match search</div>
          </div>

          <div className="section-label">Your contact details (reporter)</div>
          <div className="form-grid form-grid-2" style={{ marginBottom: '20px' }}>
            <div className="field">
              <label>Your name *</label>
              <input type="text" placeholder="Your full name" />
            </div>
            <div className="field">
              <label>Phone number *</label>
              <input type="tel" placeholder="+234 800 000 0000" />
            </div>
            <div className="field">
              <label>Relationship to missing person *</label>
              <select>
                <option value="">Select relationship</option>
                <option>Parent</option>
                <option>Sibling</option>
                <option>Spouse</option>
                <option>Child</option>
                <option>Friend</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field">
              <label>Email (optional)</label>
              <input type="email" placeholder="for updates" />
            </div>
          </div>

          <div className="info-block">
            <span className="info-icon">ℹ️</span>
            <span className="info-text">
              Your personal contact details are <strong>never shown publicly</strong>. Only verified police officers on this case will be able to see your information.
            </span>
          </div>

          <button className="btn-primary" onClick={onNext}>
            Continue to police station →
          </button>
        </div>
      </div>
    </div>
  )
}
