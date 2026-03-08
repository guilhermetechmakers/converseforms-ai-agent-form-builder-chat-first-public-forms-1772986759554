import { Link } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedPage } from '@/components/AnimatedPage'

export default function Help() {
  return (
    <AnimatedPage className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold text-foreground">Help & FAQ</h1>
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Getting started</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Create an agent, add fields and persona, then publish to get a public chat link.
                Share the link to collect leads via conversation.
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Webhooks</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Configure webhooks in Dashboard → Webhooks. Events like session.completed are
                sent to your URL with HMAC signing.
              </CardContent>
            </Card>
          </div>
          <Link to="/" className="mt-8 inline-block text-primary hover:underline">
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </AnimatedPage>
  )
}
