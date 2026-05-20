import ProgressBar from './ProgressBar'
import Step1PersonDetails from './steps/Step1PersonDetails'
import Step2PoliceStation from './steps/Step2PoliceStation'
import Step3POCEntry from './steps/Step3POCEntry'
import Step4Review from './steps/Step4Review'
import Step5Success from './steps/Step5Success'

export default function ReportFlow() {
  // step is 1-5; step 5 is the success screen (no progress bar)
  const [step, setStep] = useState(1)

  function goStep(n) {
    if (n < 1 || n > 5) return
    setStep(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <div className="flow-header">
        <h2>Report a missing person</h2>
        <p>Complete all steps to file an official report and connect with your nearest police station.</p>
      </div>

      {step < 5 && (
        <ProgressBar currentStep={step} onGoStep={goStep} />
      )}

      {step === 1 && <Step1PersonDetails onNext={() => goStep(2)} />}
      {step === 2 && <Step2PoliceStation onNext={() => goStep(3)} onBack={() => goStep(1)} />}
      {step === 3 && <Step3POCEntry onNext={() => goStep(4)} onBack={() => goStep(2)} />}
      {step === 4 && <Step4Review onSubmit={() => goStep(5)} onBack={() => goStep(3)} />}
      {step === 5 && <Step5Success />}
    </div>
  )
}

// useState import needed inside this file
import { useState } from 'react'
