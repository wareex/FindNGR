import { useState } from 'react'
import ProgressBar from './ProgressBar.jsx'
import Step1PersonDetails from './steps/Step1PersonDetails.jsx'
import Step2PoliceStation from './steps/Step2PoliceStation.jsx'
import Step3POCEntry from './steps/Step3POCEntry.jsx'
import Step4Review from './steps/Step4Review.jsx'
import Step5Success from './steps/Step5Success.jsx'

const STEPS = ['Person Details', 'Police Station', 'Your Contact', 'Review']

function genRef() {
  return 'FNG-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2,5).toUpperCase()
}

export default function ReportFlow({ onSubmit, onDone }) {
  const [step, setStep] = useState(0)
  const [refNum, setRefNum] = useState(null)
  const [personData, setPersonData] = useState({})
  const [stationData, setStationData] = useState({})
  const [contactData, setContactData] = useState({})

  const handleSubmit = () => {
    const ref = genRef()
    setRefNum(ref)
    onSubmit({
      id: ref,
      name: personData.name,
      age: personData.age,
      gender: personData.gender,
      state: personData.state,
      lga: personData.lga,
      lastSeen: personData.lastSeen,
      dateLastSeen: personData.dateLastSeen,
      complexion: personData.complexion,
      description: personData.description,
      photoUrl: personData.photoUrl || null,
      station: stationData.selectedStation?.name,
      policeReported: stationData.policeReported,
      caseRef: stationData.caseRef,
      reportedAt: new Date().toISOString(),
      ref,
    })
    setStep(4)
  }

  const stepTitles = [
    'Person Details',
    'Nearest Police Station',
    'Your Contact Info',
    'Review & Submit',
  ]
  const stepSubs = [
    'Provide details about the missing person',
    'Select a police station to notify',
    'Your contact details for follow-up',
    'Confirm all details before submitting',
  ]

  return (
    <div className="flow-wrapper">
      <div className="flow-inner">
        <div className="flow-card">
          {step < 4 ? (
            <>
              <ProgressBar current={step} total={4} />
              <h2 className="flow-title">{stepTitles[step]}</h2>
              <p className="flow-sub">{stepSubs[step]}</p>

              {step === 0 && (
                <Step1PersonDetails
                  data={personData}
                  onChange={setPersonData}
                  onNext={() => setStep(1)}
                />
              )}
              {step === 1 && (
                <Step2PoliceStation
                  data={stationData}
                  personData={personData}
                  onChange={setStationData}
                  onNext={() => setStep(2)}
                  onBack={() => setStep(0)}
                />
              )}
              {step === 2 && (
                <Step3POCEntry
                  data={contactData}
                  onChange={setContactData}
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
                />
              )}
              {step === 3 && (
                <Step4Review
                  personData={personData}
                  stationData={stationData}
                  contactData={contactData}
                  onSubmit={handleSubmit}
                  onBack={() => setStep(2)}
                />
              )}
            </>
          ) : (
            <Step5Success refNum={refNum} onDone={onDone} type="report" />
          )}
        </div>
      </div>
    </div>
  )
}
