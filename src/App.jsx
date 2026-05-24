import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import MissingBoard from './components/MissingBoard.jsx'
import ModeBar from './components/ModeBar.jsx'
import ReportFlow from './components/ReportFlow.jsx'
import FinderFlow from './components/FinderFlow.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [mode, setMode] = useState(null) // null | 'report' | 'finder'
  const [missingCases, setMissingCases] = useState([])
  const [sightings, setSightings] = useState([])

  // Load persisted data on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('findngr_cases')
      if (saved) setMissingCases(JSON.parse(saved))
    } catch (_) {}
    try {
      const saved = localStorage.getItem('findngr_sightings')
      if (saved) setSightings(JSON.parse(saved))
    } catch (_) {}
  }, [])

  const addCase = (newCase) => {
    const updated = [newCase, ...missingCases]
    setMissingCases(updated)
    try { localStorage.setItem('findngr_cases', JSON.stringify(updated)) } catch (_) {}
  }

  const addSighting = (sighting) => {
    const updated = [sighting, ...sightings]
    setSightings(updated)
    try { localStorage.setItem('findngr_sightings', JSON.stringify(updated)) } catch (_) {}
  }

  const scrollToMode = () => {
    setTimeout(() => {
      document.getElementById('action-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const handleModeSelect = (m) => {
    setMode(m)
    scrollToMode()
  }

  return (
    <div className="app">
      <Navbar />
      <Hero onCTA={handleModeSelect} />
      <MissingBoard cases={missingCases} sightings={sightings} />
      <div id="action-section">
        <ModeBar mode={mode} setMode={setMode} />
        {mode === 'report' && (
          <ReportFlow onSubmit={addCase} onDone={() => setMode(null)} />
        )}
        {mode === 'finder' && (
          <FinderFlow onSubmit={addSighting} onDone={() => setMode(null)} />
        )}
      </div>
      <Footer />
    </div>
  )
}
