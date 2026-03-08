import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { AnimatedPage } from '@/components/AnimatedPage'
import { useAgent, usePublishAgent } from '@/hooks/useAgents'
import { Copy, ExternalLink, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

export default function AgentPublish() {
  const { id } = useParams()
  const { data: agent, isLoading } = useAgent(id ?? '')
  const publishAgent = usePublishAgent()

  const copyUrl = () => {
    if (agent?.publicUrl) {
      navigator.clipboard.writeText(agent.publicUrl)
      toast.success('Link copied to clipboard')
    }
  }

  if (isLoading || !agent) {
    return (
      <AnimatedPage className="p-6">
        <Skeleton className="mx-auto h-64 max-w-xl" />
      </AnimatedPage>
    )
  }

  return (
    <AnimatedPage className="p-6 md:p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/dashboard/agents/${agent.id}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold text-foreground">Publish</h1>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>{agent.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Share the public link so respondents can chat with your agent.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {agent.status !== 'published' && (
              <Button
                onClick={() => publishAgent.mutate(agent.id)}
                disabled={publishAgent.isPending}
              >
                {publishAgent.isPending ? 'Publishing...' : 'Publish agent'}
              </Button>
            )}
            {agent.publicUrl && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Public URL</label>
                <div className="flex gap-2">
                  <Input readOnly value={agent.publicUrl} className="font-mono text-sm" />
                  <Button variant="outline" size="icon" onClick={copyUrl}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href={agent.publicUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AnimatedPage>
  )
}
