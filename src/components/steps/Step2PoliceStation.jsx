import { useState, useEffect } from 'react'
import { fetchPoliceStations } from '../../utils/policeStations.js'

export default function Step2PoliceStation({ data, personData, onChange, onNext, onBack }) {
  const [stations, setStations] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState(null)

  // Auto-search when we arrive on this step if state is set
  useEffect(() => {
    if (personData?.state && !searched) {
      handleSearch()
    }
  }, [])

  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    setSearched(true)
    try {
      const results = await fetchPoliceStations(personData?.state, personData?.lga)
      setStations(results)
    } catch (e) {
      setError('Could not load stations. Please select manually below or call 112.')
    } finally {
      setLoading(false)
    }
  }

  const select = (station) => {
    onChange({ ...data, selectedStation: station })
  }

  const validate = () => {
    if (!data.selectedStation) {
      setError('Please select a police station or enter one manually')
      return false
    }
    return true
  }

  return (
    <div>
      <div className="anon-banner">
        <div className="anon-banner-icon">🏛️</div>
        <div className="anon-banner-text">
          We searched for <strong>police stations near {personData?.state || 'your location'}</strong>.
          Select the one you wish to notify, or the closest one to your area.
          You can also contact the Nigeria Police Force directly at <strong>112</strong>.
        </div>
      </div>

      {personData?.state && (
        <div className="station-search-box">
          <input
            className="field-input"
            value={`${personData.state}${personData.lga ? ` — ${personData.lga}` : ''}`}
            readOnly
          />
          <button className="btn-search-stations" onClick={handleSearch} disabled={loading}>
            {loading ? <><span className="spinner" /> Searching…</> : '🔍 Refresh Search'}
          </button>
        </div>
      )}

      {loading && (
        <div className="station-loading">
          <span className="spinner" />
          Searching OpenStreetMap for police stations near {personData?.state}…
        </div>
      )}

      {error && <div className="field-error" style={{ marginBottom: 12 }}>{error}</div>}

      {!loading && stations.length > 0 && (
        <div className="stations-list">
          {stations.map((s, i) => (
            <div
              key={i}
              className={`station-card ${data.selectedStation?.name === s.name ? 'selected' : ''}`}
              onClick={() => select(s)}
            >
              <div className="station-card-name">🏢 {s.name}</div>
              <div className="station-card-detail">
                {s.address && <span>📍 {s.address}</span>}
                {s.dist != null && <span>  ·  ~{s.dist} km away</span>}
                {s.phone && <span>  ·  📞 {s.phone}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && searched && stations.length === 0 && (
        <div className="station-no-results">
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>🔍</div>
          <div>No stations found on the map for this area.</div>
          <div style={{ marginTop: 8 }}>Please enter the station name manually below.</div>
        </div>
      )}

      <div className="field-group" style={{ marginTop: 20 }}>
        <label className="field-label">Enter Station Name Manually (optional override)</label>
        <input
          className="field-input"
          placeholder="e.g. Iyaganku Police Division, Ibadan"
          value={data.manualStation || ''}
          onChange={e => {
            onChange({
              ...data,
              manualStation: e.target.value,
              selectedStation: e.target.value ? { name: e.target.value, address: '', phone: '' } : data.selectedStation
            })
          }}
        />
      </div>

      <div className="field-group">
        <label className="field-label">Have you already reported to police?</label>
        <select
          className="field-input"
          value={data.policeReported || ''}
          onChange={e => onChange({ ...data, policeReported: e.target.value })}
        >
          <option value="">Select</option>
          <option>Yes — already reported</option>
          <option>No — not yet reported</option>
          <option>No — but will do so</option>
        </select>
      </div>

      {data.policeReported === 'Yes — already reported' && (
        <div className="field-group">
          <label className="field-label">Case / Report Reference Number</label>
          <input
            className="field-input"
            placeholder="e.g. KAN/2025/001234"
            value={data.caseRef || ''}
            onChange={e => onChange({ ...data, caseRef: e.target.value })}
          />
        </div>
      )}

      <div className="step-nav">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <button
          className="btn-next"
          onClick={() => { if (!data.selectedStation && !data.manualStation) { setError('Please select or enter a police station') } else { onNext() } }}
        >
          Next: Contact Details →
        </button>
      </div>
    </div>
  )
}
