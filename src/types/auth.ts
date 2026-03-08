import type { User } from './user'

export interface SignInInput {
  email: string
  password: string
}

export interface SignUpInput {
  email: string
  password: string
  fullName?: string
}

export interface AuthResponse {
  token: string
  user: User
}
