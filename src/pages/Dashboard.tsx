import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AnimatedPage } from '@/components/AnimatedPage'
import { useAgents } from '@/hooks/useAgents'
import { useSessions } from '@/hooks/useSessions'
import { Bot, MessageSquare, Plus, TrendingUp } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export default function Dashboard() {
  const { data: agents, isLoading: agentsLoading } = useAgents()
  const { data: sessions, isLoading: sessionsLoading } = useSessions()

  const agentCount = agents?.length ?? 0
  const sessionCount = sessions?.length ?? 0
  const completedSessions = sessions?.filter((s) => s.status === 'completed').length ?? 0
  const completionRate =
    sessionCount > 0 ? Math.round((completedSessions / sessionCount) * 100) : 0

  return (
    <AnimatedPage className="p-6 md:p-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
            Dashboard
          </h1>
          <Button asChild>
            <Link to="/dashboard/agents/new">
              <Plus className="mr-2 h-4 w-4" />
              Create agent
            </Link>
          </Button>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Agents
              </CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {agentsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <span className="text-2xl font-bold">{agentCount}</span>
              )}
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Sessions
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {sessionsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <span className="text-2xl font-bold">{sessionCount}</span>
              )}
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completion rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold">{completionRate}%</span>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Recent sessions</CardTitle>
            <p className="text-sm text-muted-foreground">
              Latest conversations from your agents.
            </p>
          </CardHeader>
          <CardContent>
            {sessionsLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : !sessions?.length ? (
              <p className="py-8 text-center text-muted-foreground">
                No sessions yet. Publish an agent and share the link to start collecting.
              </p>
            ) : (
              <ul className="space-y-2">
                {sessions.slice(0, 5).map((s) => (
                  <li key={s.id}>
                    <Link
                      to={`/dashboard/sessions/${s.id}`}
                      className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                    >
                      <span className="font-medium">{s.agentName ?? s.agentId}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(s.createdAt), { addSuffix: true })}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {sessions && sessions.length > 0 && (
              <Button variant="outline" className="mt-4" asChild>
                <Link to="/dashboard/sessions">View all sessions</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </AnimatedPage>
  )
}
