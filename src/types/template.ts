import type { FormField } from './agent'

export interface AgentTemplate {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  fields: FormField[]
  personaPreview?: string
  thumbnailUrl?: string
}
