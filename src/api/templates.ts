import { api } from '@/lib/api'
import type { AgentTemplate } from '@/types/template'

export const templatesApi = {
  getAll: async (): Promise<AgentTemplate[]> =>
    api.get<AgentTemplate[]>('/templates'),
  getById: async (id: string): Promise<AgentTemplate> =>
    api.get<AgentTemplate>(`/templates/${id}`),
  clone: async (templateId: string): Promise<{ id: string }> =>
    api.post<{ id: string }>('/agents/clone', { templateId }),
}
