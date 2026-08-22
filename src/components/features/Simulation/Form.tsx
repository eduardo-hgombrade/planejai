import { PiggyBank } from 'lucide-react'

import { FormStep } from './FormStep'
import { StepProgress } from './Progress'


export const SimulationForm = () => {
  return (
    <>
      <StepProgress currentStep={6} totalSteps={10} />
      <FormStep 
        icon={PiggyBank}
        title="Renda mensal bruta"
        question="Quanto dinheiro é depositado em sua conta bancária todo mês (somando todas as fontes)?"
        inputProps={{
          type: 'text',
          placeholder: 'ex: R$ 5.000,00',
          prefix: 'R$',
        }}
      />
    </>
  )
}
