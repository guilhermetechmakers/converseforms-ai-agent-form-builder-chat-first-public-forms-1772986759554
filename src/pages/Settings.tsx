import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedPage } from '@/components/AnimatedPage'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Webhook, Key, Database } from 'lucide-react'

export default function Settings() {
  return (
    <AnimatedPage className="p-6 md:p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-2xl font-semibold text-foreground md:text-3xl">
          Settings
        </h1>

        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                Webhooks
              </CardTitle>
              <CardDescription>Manage outbound webhook endpoints.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <Link to="/dashboard/webhooks">Open webhooks</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API keys
              </CardTitle>
              <CardDescription>API keys for server-side integrations.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage API keys in your account dashboard.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data retention
              </CardTitle>
              <CardDescription>Configure how long session data is kept.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Default: 90 days. Contact support to change.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AnimatedPage>
  )
}
