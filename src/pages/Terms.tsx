import { Link } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AnimatedPage } from '@/components/AnimatedPage'

export default function Terms() {
  return (
    <AnimatedPage className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold text-foreground">Terms of Service</h1>
          <div className="prose prose-slate max-w-none text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              By using ConverseForms you agree to these terms. Use the service responsibly.
              Billing terms apply to paid plans. We may update these terms; continued use
              constitutes acceptance.
            </p>
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
