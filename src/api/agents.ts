import { api } from '@/lib/api'
import type { Agent, CreateAgentInput, UpdateAgentInput } from '@/types/agent'

export const agentsApi = {
  getAll: async (): Promise<Agent[]> => api.get<Agent[]>('/agents'),
  getById: async (id: string): Promise<Agent> => api.get<Agent>(`/agents/${id}`),
  getBySlug: async (slug: string): Promise<Agent> =>
    api.get<Agent>(`/agents/public/${slug}`),
  create: async (agent: CreateAgentInput): Promise<Agent> =>
    api.post<Agent>('/agents', agent),
  update: async (id: string, updates: UpdateAgentInput): Promise<Agent> =>
    api.put<Agent>(`/agents/${id}`, updates),
  delete: async (id: string): Promise<void> => api.delete(`/agents/${id}`),
  publish: async (id: string): Promise<Agent> =>
    api.post<Agent>(`/agents/${id}/publish`, {}),
}
