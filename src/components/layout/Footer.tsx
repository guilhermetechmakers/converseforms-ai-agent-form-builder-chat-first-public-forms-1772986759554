import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const footerLinks = [
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
  { to: '/help', label: 'Help' },
]

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        'border-t border-border bg-muted/30 py-12',
        className
      )}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <span className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ConverseForms. All rights reserved.
        </span>
        <nav className="flex gap-6">
          {footerLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
