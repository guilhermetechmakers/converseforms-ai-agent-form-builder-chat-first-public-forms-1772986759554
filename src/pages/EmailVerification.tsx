import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedPage } from '@/components/AnimatedPage'

export default function EmailVerification() {
  const [params] = useSearchParams()
  const token = params.get('token')

  return (
    <AnimatedPage className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md border-border shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <CardDescription>
            {token
              ? 'Click below to confirm your email and finish signup.'
              : 'Check your inbox for the verification link.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full">
            <Link to={token ? `/verify?token=${token}` : '/login'}>
              {token ? 'Confirm email' : 'Back to login'}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </AnimatedPage>
  )
}
