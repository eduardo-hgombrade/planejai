import { ArrowRight, Clock3, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/shared/Button'
import { PageHero } from '@/components/shared/PageHero'
import type { SimulationRecord } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { calcMonthlySavings } from '@/utils/simulation'

function formatCurrency(value: string) {
  return `R$ ${value}`
}

export function SimulationHistoryPage() {
  const navigate = useNavigate()
  const { getAllSimulations, deleteSimulation } = useSimulationStorage()
  const [simulations, setSimulations] = useState<SimulationRecord[]>(() =>
    getAllSimulations().reverse(),
  )

  const handleDelete = (id: string) => {
    if (!window.confirm('Deseja excluir esta simulação?')) {
      return
    }

    deleteSimulation(id)
    setSimulations((current) =>
      current.filter((simulation) => simulation.id !== id),
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de Simulações"
        subtitle="Acompanhe suas metas e consulte os insights gerados."
      />

      {simulations.length === 0 ? (
        <section className="bg-card flex flex-col items-center rounded-2xl p-8 text-center shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-12">
          <div className="bg-muted-primary mb-4 flex h-14 w-14 items-center justify-center rounded-full">
            <Clock3 className="text-primary" size={28} />
          </div>
          <h2 className="text-foreground text-lg font-semibold">
            Nenhuma simulação salva
          </h2>
          <p className="text-muted-foreground mt-2 max-w-sm text-sm">
            Crie sua primeira simulação para começar a planejar seus objetivos.
          </p>
          <Button
            variant="primary"
            icon={ArrowRight}
            className="mt-6"
            onClick={() => void navigate('/')}
          >
            Nova simulação
          </Button>
        </section>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {simulations.map((simulation) => (
            <article
              key={simulation.id}
              className="bg-card flex flex-col rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-primary text-xs font-semibold tracking-widest uppercase">
                    Meta financeira
                  </p>
                  <h2 className="text-foreground mt-1 text-lg font-semibold">
                    {simulation.goalName}
                  </h2>
                </div>
                <button
                  type="button"
                  aria-label={`Excluir simulação ${simulation.goalName}`}
                  title="Excluir simulação"
                  className="text-muted-foreground hover:text-red-500"
                  onClick={() => handleDelete(simulation.id)}
                >
                  <Trash2 size={19} />
                </button>
              </div>

              <dl className="border-border grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <dt className="text-muted-foreground text-xs">
                    Custo da meta
                  </dt>
                  <dd className="text-foreground mt-1 text-sm font-semibold">
                    {formatCurrency(simulation.goalAmount)}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs">Prazo</dt>
                  <dd className="text-foreground mt-1 text-sm font-semibold">
                    {simulation.goalDeadline} meses
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs">
                    Economia mensal
                  </dt>
                  <dd className="text-primary mt-1 text-sm font-semibold">
                    R${' '}
                    {calcMonthlySavings(simulation).toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </dd>
                </div>
              </dl>

              <Button
                variant="secondary"
                icon={ArrowRight}
                className="mt-6 w-full"
                onClick={() => void navigate(`/resultado/${simulation.id}`)}
              >
                Ver detalhes
              </Button>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
