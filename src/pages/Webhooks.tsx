import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AnimatedPage } from '@/components/AnimatedPage'
import { useWebhooks } from '@/hooks/useWebhooks'
import { Webhook as WebhookIcon } from 'lucide-react'

export default function Webhooks() {
  const { data: webhooks, isLoading } = useWebhooks()

  return (
    <AnimatedPage className="p-6 md:p-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
            Webhooks
          </h1>
          <Button>Add webhook</Button>
        </div>

        {isLoading ? (
          <Skeleton className="h-48 w-full rounded-xl" />
        ) : !webhooks?.length ? (
          <Card className="border-border">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <WebhookIcon className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-2 text-lg font-medium">No webhooks</p>
              <p className="mb-6 text-center text-muted-foreground">
                Add a webhook to send session events to your CRM or backend.
              </p>
              <Button>Add webhook</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {webhooks.map((w) => (
              <Card key={w.id} className="border-border">
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{w.url}</CardTitle>
                    <CardDescription>
                      Events: {w.events.join(', ')} · {w.enabled ? 'Enabled' : 'Disabled'}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AnimatedPage>
  )
}
