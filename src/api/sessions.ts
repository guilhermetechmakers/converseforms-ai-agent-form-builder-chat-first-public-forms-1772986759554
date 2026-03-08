import { api } from '@/lib/api'
import type { Session, SessionListItem } from '@/types/session'

export const sessionsApi = {
  getAll: async (agentId?: string): Promise<SessionListItem[]> => {
    const q = agentId ? `?agentId=${agentId}` : ''
    return api.get<SessionListItem[]>(`/sessions${q}`)
  },
  getById: async (id: string): Promise<Session> =>
    api.get<Session>(`/sessions/${id}`),
  exportSession: async (id: string, format: 'json' | 'csv'): Promise<Blob> => {
    const base = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'
    const token = localStorage.getItem('auth_token')
    const res = await fetch(`${base}/sessions/${id}/export?format=${format}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    if (!res.ok) throw new Error(`Export failed: ${res.status}`)
    return res.blob()
  },
}
