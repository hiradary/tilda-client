import type { User } from "../"

export interface SignUp {
  name: string
  email: string
  password: string
}

export interface SignIn {
  username?: string
  email?: string
  password: string
}

// ----------- API Responses -----------

export interface SignInResponse {
  user: User
  token: string
}

// ----------- End API Response --------
