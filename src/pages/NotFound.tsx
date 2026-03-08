import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AnimatedPage } from '@/components/AnimatedPage'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <AnimatedPage className="flex min-h-screen flex-col items-center justify-center px-4">
      <Card className="w-full max-w-md border-border text-center">
        <CardContent className="pt-8 pb-8">
          <h1 className="mb-2 text-4xl font-bold text-foreground">404</h1>
          <p className="mb-6 text-muted-foreground">
            The page you’re looking for doesn’t exist or was moved.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/dashboard">
                <Search className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </AnimatedPage>
  )
}
