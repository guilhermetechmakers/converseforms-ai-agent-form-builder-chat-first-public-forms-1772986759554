import { Link } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedPage } from '@/components/AnimatedPage'
import { useTemplates } from '@/hooks/useTemplates'
import { Skeleton } from '@/components/ui/skeleton'
import { FileText } from 'lucide-react'

export default function TemplatesLibrary() {
  const { data: templates, isLoading } = useTemplates()

  return (
    <AnimatedPage className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="mb-4 text-3xl font-bold text-foreground">Templates</h1>
          <p className="mb-10 text-muted-foreground">
            Start from a template and customize your agent.
          </p>

          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          ) : !templates?.length ? (
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">No templates available yet.</p>
                <Button asChild className="mt-4">
                  <Link to="/signup">Create an agent from scratch</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((t) => (
                <Card key={t.id} className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">{t.name}</CardTitle>
                    <CardDescription>{t.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <Link to={`/signup?template=${t.id}`}>Use template</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </AnimatedPage>
  )
}
