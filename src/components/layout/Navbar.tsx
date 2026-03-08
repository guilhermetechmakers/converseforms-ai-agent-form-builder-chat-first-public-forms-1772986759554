import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/templates', label: 'Templates' },
  { to: '/dashboard', label: 'Dashboard' },
]

export function Navbar({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex h-16 w-full items-center border-b border-border bg-background/95 px-6',
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
          ConverseForms
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
