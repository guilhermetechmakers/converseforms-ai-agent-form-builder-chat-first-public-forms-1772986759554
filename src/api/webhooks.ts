import { api } from '@/lib/api'
import type { Webhook, CreateWebhookInput } from '@/types/webhook'

export const webhooksApi = {
  getAll: async (): Promise<Webhook[]> => api.get<Webhook[]>('/webhooks'),
  create: async (input: CreateWebhookInput): Promise<Webhook> =>
    api.post<Webhook>('/webhooks', input),
  update: async (id: string, updates: Partial<Webhook>): Promise<Webhook> =>
    api.put<Webhook>(`/webhooks/${id}`, updates),
  delete: async (id: string): Promise<void> =>
    api.delete(`/webhooks/${id}`),
  test: async (id: string): Promise<{ success: boolean }> =>
    api.post<{ success: boolean }>(`/webhooks/${id}/test`, {}),
}
