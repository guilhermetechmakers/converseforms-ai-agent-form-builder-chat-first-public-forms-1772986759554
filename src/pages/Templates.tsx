import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AnimatedPage } from '@/components/AnimatedPage'
import { useTemplates } from '@/hooks/useTemplates'
import { FileText } from 'lucide-react'

export default function Templates() {
  const { data: templates, isLoading } = useTemplates()

  return (
    <AnimatedPage className="p-6 md:p-8">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="mb-8 text-2xl font-semibold text-foreground md:text-3xl">
          Templates
        </h1>

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
              <p className="mb-2 text-lg font-medium">No templates</p>
              <p className="text-center text-muted-foreground">
                Prebuilt agent templates will appear here. Clone one to get started quickly.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <Card key={t.id} className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">{t.name}</CardTitle>
                  <CardDescription>{t.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link to={`/dashboard/agents/new?template=${t.id}`}>
                      Use template
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AnimatedPage>
  )
}
