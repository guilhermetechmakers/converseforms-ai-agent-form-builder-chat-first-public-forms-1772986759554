import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AnimatedPage } from '@/components/AnimatedPage'
import { useSessions } from '@/hooks/useSessions'
import { formatDistanceToNow } from 'date-fns'

export default function SessionList() {
  const { data: sessions, isLoading } = useSessions()

  return (
    <AnimatedPage className="p-6 md:p-8">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="mb-8 text-2xl font-semibold text-foreground md:text-3xl">
          Sessions
        </h1>

        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        ) : !sessions?.length ? (
          <Card className="border-border">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <p className="mb-2 text-lg font-medium">No sessions yet</p>
              <p className="text-center text-muted-foreground">
                Sessions will appear here when respondents use your published agents.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {sessions.map((s) => (
              <Link key={s.id} to={`/dashboard/sessions/${s.id}`}>
                <Card className="border-border transition-colors hover:bg-muted/50">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">{s.agentName ?? s.agentId}</p>
                      <p className="text-sm text-muted-foreground">
                        {s.extractedFieldsCount} fields · {s.status}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(s.createdAt), { addSuffix: true })}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AnimatedPage>
  )
}
