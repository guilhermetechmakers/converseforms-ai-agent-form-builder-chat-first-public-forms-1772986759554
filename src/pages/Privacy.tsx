import { Link } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AnimatedPage } from '@/components/AnimatedPage'

export default function Privacy() {
  return (
    <AnimatedPage className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold text-foreground">Privacy Policy</h1>
          <div className="prose prose-slate max-w-none text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              ConverseForms collects and processes data as described in this policy. We use
              session data (transcripts, extracted fields) to provide the service. We do not
              sell your data. You can export or delete your data from the dashboard.
            </p>
            <p>For questions: privacy@converseforms.example.com</p>
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
