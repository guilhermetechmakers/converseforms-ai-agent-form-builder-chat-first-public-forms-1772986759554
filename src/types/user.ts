export interface User {
  id: string
  email: string
  fullName?: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
}

export interface UpdateUserInput {
  id: string
  fullName?: string
  avatarUrl?: string
}
