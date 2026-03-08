import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AnimatedPage } from '@/components/AnimatedPage'
import { useAgents } from '@/hooks/useAgents'
import { Bot, Plus } from 'lucide-react'
import type { Agent } from '@/types/agent'

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Card className="border-border transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">{agent.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {agent.fields?.length ?? 0} fields · {agent.status}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/dashboard/agents/${agent.id}`}>Edit</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {agent.description && (
          <p className="text-sm text-muted-foreground">{agent.description}</p>
        )}
        {agent.publicUrl && (
          <p className="mt-2 truncate text-xs text-muted-foreground">
            {agent.publicUrl}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default function AgentList() {
  const { data: agents, isLoading } = useAgents()

  return (
    <AnimatedPage className="p-6 md:p-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
            Agents
          </h1>
          <Button asChild>
            <Link to="/dashboard/agents/new">
              <Plus className="mr-2 h-4 w-4" />
              Create agent
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : !agents?.length ? (
          <Card className="border-border">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Bot className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-2 text-lg font-medium">No agents yet</p>
              <p className="mb-6 text-center text-muted-foreground">
                Create your first agent to start collecting leads via conversation.
              </p>
              <Button asChild>
                <Link to="/dashboard/agents/new">Create agent</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        )}
      </div>
    </AnimatedPage>
  )
}
