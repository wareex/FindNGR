import { useState, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import ModeBar from './components/ModeBar'
import ReportFlow from './components/ReportFlow'
import FinderFlow from './components/FinderFlow'

export default function App() {
  const [mode, setMode] = useState('report')
  const flowRef = useRef(null)

  function handleMode(m) {
    setMode(m)
    setTimeout(() => {
      flowRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <>
      <Navbar onMode={handleMode} />
      <Hero onMode={handleMode} />

      <div className="flow-wrapper" ref={flowRef}>
        <ModeBar mode={mode} onMode={handleMode} />
        {mode === 'report' ? <ReportFlow /> : <FinderFlow />}
      </div>

      <Footer />
    </>
  )
}
