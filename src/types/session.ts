export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface ExtractedField {
  fieldId: string
  label: string
  value: string | number | string[]
  validated: boolean
  timestamp?: string
}

export interface SessionMetadata {
  ip?: string
  userAgent?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

export interface Session {
  id: string
  agentId: string
  messages: ChatMessage[]
  extractedFields: ExtractedField[]
  status: 'in_progress' | 'completed' | 'abandoned'
  metadata?: SessionMetadata
  createdAt: string
  updatedAt: string
}

export interface SessionListItem {
  id: string
  agentId: string
  agentName?: string
  status: Session['status']
  extractedFieldsCount: number
  createdAt: string
}
