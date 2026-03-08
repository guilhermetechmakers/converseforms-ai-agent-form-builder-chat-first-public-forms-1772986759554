import { Outlet } from 'react-router-dom'
import { DashboardSidebar } from './DashboardSidebar'
import { cn } from '@/lib/utils'

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <main className={cn('flex-1 overflow-auto')}>
        <Outlet />
      </main>
    </div>
  )
}
