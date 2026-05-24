import { useState } from 'react'
import ShareButtons from "./ShareButtons";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function CaseCard({ c }) {
  return (
    <div className="case-card">
      {c.photoUrl ? (
        <img src={c.photoUrl} alt={c.name} className="case-card-img" />
      ) : (
        <div className="case-card-img-placeholder">
          {c.gender === 'Female' ? '👩' : c.gender === 'Male' ? '👨' : '🧑'}
        </div>
      )}
      <div className="case-card-body">
        <span className={`case-card-status ${c.type === 'sighting' ? 'status-sighting' : 'status-missing'}`}>
          {c.type === 'sighting' ? '👁 Sighting' : '🔴 Missing'}
        </span>
        <div className="case-card-name">{c.name || c.description?.slice(0, 30) + '…'}</div>
        <div className="case-card-meta">
          {c.age && <span>🎂 Age {c.age}</span>}
          {c.lastSeen && <span>📍 Last seen: {c.lastSeen}</span>}
          {c.state && <span>🗺️ {c.state}{c.lga ? `, ${c.lga}` : ''}</span>}
          {c.type === 'sighting' && c.location && <span>📍 {c.location}</span>}
          
        </div>
         <ShareButtons
        personName={selectedPerson.name}
        reportId={selectedPerson.id || ""}
      />
        <div className="case-card-date">Reported {timeAgo(c.reportedAt)}</div>
      </div>
    </div>
  )
}

export default function MissingBoard({ cases, sightings }) {
  const [filter, setFilter] = useState('all')

  const allItems = [
    ...cases.map(c => ({ ...c, type: 'missing' })),
    ...sightings.map(s => ({ ...s, type: 'sighting' }))
  ].sort((a, b) => new Date(b.reportedAt) - new Date(a.reportedAt))

  const filtered = filter === 'all' ? allItems
    : filter === 'missing' ? allItems.filter(i => i.type === 'missing')
    : allItems.filter(i => i.type === 'sighting')

  return (
    <section className="board-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Missing Persons Board</h2>
          <p className="section-sub">
            {allItems.length === 0
              ? 'No reports yet — be the first to submit a report below.'
              : `${cases.length} missing report${cases.length !== 1 ? 's' : ''} · ${sightings.length} sighting${sightings.length !== 1 ? 's' : ''}`
            }
          </p>
        </div>
        {allItems.length > 0 && (
          <div className="board-filter">
            {['all', 'missing', 'sighting'].map(f => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All' : f === 'missing' ? '🔴 Missing' : '👁 Sightings'}
              </button>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="board-empty">
          <div className="board-empty-icon">
            {allItems.length === 0 ? '📋' : '🔍'}
          </div>
          <h3>{allItems.length === 0 ? 'No Reports Yet' : 'No results'}</h3>
          <p>
            {allItems.length === 0
              ? 'Reports submitted through the form below will appear here instantly.'
              : 'Try a different filter.'}
          </p>
        </div>
      ) : (
        <div className="board-grid">
          {filtered.map((item, i) => (
            <CaseCard key={item.id || i} c={item} />
          ))}
        </div>
      )}
    </section>
  )
}
