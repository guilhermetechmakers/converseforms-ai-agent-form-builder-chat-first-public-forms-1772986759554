export interface FormFieldValidation {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom'
  value?: string | number
  message?: string
}

export interface FormField {
  id: string
  type: 'text' | 'email' | 'phone' | 'number' | 'select' | 'multiselect' | 'date' | 'textarea'
  label: string
  placeholder?: string
  required: boolean
  validations?: FormFieldValidation[]
  options?: { value: string; label: string }[]
  conditionalLogic?: { fieldId: string; operator: string; value: string }
}

export interface AgentPersona {
  tone: string
  instructions: string
  prohibitedTopics?: string[]
}

export interface AgentAppearance {
  primaryColor?: string
  avatarUrl?: string
  headerTitle?: string
}

export interface Agent {
  id: string
  name: string
  description?: string
  fields: FormField[]
  persona: AgentPersona
  appearance: AgentAppearance
  status: 'draft' | 'published' | 'archived'
  publicSlug?: string
  publicUrl?: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface CreateAgentInput {
  name: string
  description?: string
  fields?: FormField[]
  persona?: Partial<AgentPersona>
  appearance?: Partial<AgentAppearance>
}

export interface UpdateAgentInput {
  name?: string
  description?: string
  fields?: FormField[]
  persona?: Partial<AgentPersona>
  appearance?: Partial<AgentAppearance>
  status?: Agent['status']
}
