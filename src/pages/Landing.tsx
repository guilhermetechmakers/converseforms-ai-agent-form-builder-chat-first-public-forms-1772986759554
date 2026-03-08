import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AnimatedPage } from '@/components/AnimatedPage'
import { MessageSquare, Zap, Shield, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: 'Conversational capture',
    description: 'Collect leads via natural dialogue instead of rigid forms. Higher completion and richer data.',
  },
  {
    icon: Zap,
    title: 'No-code agent builder',
    description: 'Define fields, persona, and appearance. Publish a public link in minutes.',
  },
  {
    icon: Shield,
    title: 'Server-side validation',
    description: 'Deterministic validation keeps data clean. No LLM hallucinations in your CRM.',
  },
  {
    icon: BarChart3,
    title: 'Webhooks & analytics',
    description: 'Reliable delivery to your stack. Sessions, completion rates, and exports.',
  },
]

export default function Landing() {
  return (
    <AnimatedPage className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden px-6 py-24 text-center md:py-32">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Turn forms into conversations
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
              ConverseForms turns static forms into AI agents that collect leads through natural chat. 
              Define fields once, get validated data and reliable webhooks—no engineering required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/chat/demo">Try demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/signup">Get started free</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-muted/30 px-6 py-20">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-12 text-center text-2xl font-semibold text-foreground md:text-3xl">
              Why ConverseForms
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon: Icon, title, description }, i) => (
                <Card key={i} className="animate-fade-in-up border-border bg-card">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-[1200px] text-center">
            <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">
              Ready to capture leads conversationally?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Create your first agent in minutes. No credit card required.
            </p>
            <Button size="lg" asChild>
              <Link to="/signup">Create free account</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </AnimatedPage>
  )
}
