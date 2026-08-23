import 'react-loading-skeleton/dist/skeleton.css'

import { ArrowUp, Bot, User } from 'lucide-react'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { buildChatPrompt } from '@/data/aiPrompt'
import type { ChatMessage } from '@/data/simulation'
import { useInsight } from '@/hooks/useInsight'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { askEducator } from '@/services/aiService'

import { Content } from '../Insights/Content'
import { Error } from '../Insights/Error'

interface AIInsightCardProps {
  simulationId: string
}

export function AIInsightsCard({ simulationId }: AIInsightCardProps) {
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId)
  const { getFormData, updateChatMessages } = useSimulationStorage()
  const [messages, setMessages] = useState<ChatMessage[]>(
    () => getFormData(simulationId)?.chatMessages ?? [],
  )
  const [question, setQuestion] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const [chatError, setChatError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, chatLoading])

  const handleAsk = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedQuestion = question.trim()
    const simulation = getFormData(simulationId)

    if (!trimmedQuestion || !simulation || chatLoading) {
      return
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmedQuestion,
      createdAt: new Date().toISOString(),
    }
    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    setQuestion('')
    setChatLoading(true)
    setChatError(null)
    updateChatMessages(simulationId, updatedMessages)

    try {
      const answer = await askEducator(
        buildChatPrompt(simulation, trimmedQuestion, messages),
      )
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: answer,
        createdAt: new Date().toISOString(),
      }
      const completedMessages = [...updatedMessages, assistantMessage]

      setMessages(completedMessages)
      updateChatMessages(simulationId, completedMessages)
    } catch {
      setMessages(messages)
      setQuestion(trimmedQuestion)
      updateChatMessages(simulationId, messages)
      setChatError('Não foi possível obter uma resposta. Tente novamente.')
    } finally {
      setChatLoading(false)
    }
  }

  return (
    <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
      <div className="mb-3 flex items-center gap-1.5">
        <span>✨</span>
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Insight Financeiro Personalizado
        </span>
      </div>

      {isLoading && (
        <div className="flex">
          <Skeleton
            count={10.5}
            baseColor="var(--color-skeleton-base)"
            highlightColor="var(--color-skeleton-highlight)"
            className="mb-3 flex rounded-lg"
            containerClassName="flex-1"
            inline
          />
        </div>
      )}
      {!isLoading && error && (
        <Error
          simulationId={simulationId}
          message={error}
          onRetry={() => {
            fetchInsight(simulationId)
          }}
        />
      )}
      {!isLoading && insight && !error && <Content insight={insight} />}

      {insight && !error && (
        <section className="border-border mt-6 border-t pt-5">
          <div className="mb-3 flex items-center gap-1.5">
            <Bot className="text-primary" size={18} />
            <h2 className="text-foreground text-sm font-semibold">
              Converse com seu Educador Financeiro
            </h2>
          </div>

          <div className="bg-background border-border max-h-80 space-y-3 overflow-y-auto rounded-xl border p-3">
            {messages.length === 0 && (
              <p className="text-muted-foreground py-3 text-center text-sm">
                Tire suas dúvidas sobre esta simulação.
              </p>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <Bot className="text-primary mt-2 shrink-0" size={16} />
                )}
                <p
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary-button text-foreground'}`}
                >
                  {message.content}
                </p>
                {message.role === 'user' && (
                  <User
                    className="text-muted-foreground mt-2 shrink-0"
                    size={16}
                  />
                )}
              </div>
            ))}
            {chatLoading && (
              <div className="flex items-center gap-2">
                <Bot className="text-primary" size={16} />
                <span className="text-muted-foreground text-sm">
                  Pensando...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {chatError && (
            <p className="mt-2 text-sm text-red-500">{chatError}</p>
          )}
          <form onSubmit={handleAsk} className="mt-3 flex gap-2">
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Digite sua pergunta..."
              aria-label="Digite sua pergunta para o Educador Financeiro"
              disabled={chatLoading}
              className="bg-input text-foreground placeholder:text-muted-foreground min-w-0 flex-1 rounded-xl px-4 py-3 text-sm outline-none"
            />
            <button
              type="submit"
              aria-label="Enviar pergunta"
              title="Enviar pergunta"
              disabled={!question.trim() || chatLoading}
              className="bg-primary text-primary-foreground flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowUp size={19} />
            </button>
          </form>
        </section>
      )}
    </div>
  )
}
