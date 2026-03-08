import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { AnimatedPage } from '@/components/AnimatedPage'
import { useAgentBySlug } from '@/hooks/useAgents'
import { Send } from 'lucide-react'

export default function PublicChat() {
  const { slug } = useParams()
  const { data: agent, isLoading } = useAgentBySlug(slug ?? '')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])

  const sendMessage = () => {
    if (!message.trim()) return
    setMessages((m) => [...m, { role: 'user', content: message.trim() }])
    setMessage('')
    // In production: POST /api/sessions/:id/message and append assistant reply from stream
    setMessages((m) => [
      ...m,
      {
        role: 'assistant',
        content: 'Thanks! This is a demo. Connect to your backend to process replies and validate fields.',
      },
    ])
  }

  if (isLoading) {
    return (
      <AnimatedPage className="flex min-h-screen items-center justify-center p-4">
        <Skeleton className="h-[480px] w-full max-w-2xl rounded-xl" />
      </AnimatedPage>
    )
  }

  if (!agent) {
    return (
      <AnimatedPage className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md border-border">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Agent not found.</p>
          </CardContent>
        </Card>
      </AnimatedPage>
    )
  }

  return (
    <AnimatedPage className="flex min-h-screen flex-col bg-muted/30">
      <header className="border-b border-border bg-card px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <h1 className="font-semibold text-foreground">{agent.name}</h1>
          <p className="text-xs text-muted-foreground">Conversational form</p>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-end p-4">
        <Card className="border-border">
          <CardHeader className="py-3">
            <p className="text-sm text-muted-foreground">
              {agent.persona?.instructions || 'Chat with the agent to complete the form.'}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-h-[360px] space-y-3 overflow-y-auto">
              {messages.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Say hello or answer the agent’s questions. Your replies will be validated server-side.
                </p>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <span
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {m.content}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              />
              <Button size="icon" onClick={sendMessage} disabled={!message.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedPage>
  )
}
