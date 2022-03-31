import { Dispatch } from "react"

import type { User } from "../"

// ----------- Actions -----------

interface SetUser {
  type: "set_user"
  payload: User
}

// ----------- End Actions -------

export type AuthContextAction = SetUser

export interface AuthContextState {
  user: User
}

export interface AuthContext {
  state: AuthContextState
  dispatch: Dispatch<AuthContextAction>
}
