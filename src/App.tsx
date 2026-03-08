import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import Landing from '@/pages/Landing'
import Login from '@/pages/Login'
import PasswordReset from '@/pages/PasswordReset'
import EmailVerification from '@/pages/EmailVerification'
import Dashboard from '@/pages/Dashboard'
import AgentList from '@/pages/AgentList'
import AgentBuilder from '@/pages/AgentBuilder'
import AgentPublish from '@/pages/AgentPublish'
import PublicChat from '@/pages/PublicChat'
import SessionList from '@/pages/SessionList'
import SessionViewer from '@/pages/SessionViewer'
import Templates from '@/pages/Templates'
import TemplatesLibrary from '@/pages/TemplatesLibrary'
import Webhooks from '@/pages/Webhooks'
import Settings from '@/pages/Settings'
import Privacy from '@/pages/Privacy'
import Terms from '@/pages/Terms'
import Help from '@/pages/Help'
import NotFound from '@/pages/NotFound'

import { DashboardLayout } from '@/components/layout/DashboardLayout'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/forgot-password" element={<PasswordReset />} />
          <Route path="/verify" element={<EmailVerification />} />
          <Route path="/templates" element={<TemplatesLibrary />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/help" element={<Help />} />
          <Route path="/chat/:slug" element={<PublicChat />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="agents" element={<AgentList />} />
            <Route path="agents/new" element={<AgentBuilder />} />
            <Route path="agents/:id" element={<AgentBuilder />} />
            <Route path="agents/:id/publish" element={<AgentPublish />} />
            <Route path="sessions" element={<SessionList />} />
            <Route path="sessions/:id" element={<SessionViewer />} />
            <Route path="templates" element={<Templates />} />
            <Route path="webhooks" element={<Webhooks />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  )
}

export default App
