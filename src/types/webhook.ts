export type WebhookEvent = 'session.completed' | 'session.started' | 'field.extracted'

export interface Webhook {
  id: string
  url: string
  secret?: string
  events: WebhookEvent[]
  headers?: Record<string, string>
  enabled: boolean
  createdAt: string
}

export interface CreateWebhookInput {
  url: string
  secret?: string
  events: WebhookEvent[]
  headers?: Record<string, string>
}
