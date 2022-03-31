import { createContext, ReactNode, useReducer } from "react"
import type {
  AuthContext as IAuthContext,
  AuthContextState,
  AuthContextAction,
} from "types/providers/AuthProvider"

const initialState: AuthContextState = {
  user: {
    _id: "",
    email: "",
    name: "",
    username: "",
  },
}

export const AuthContext = createContext<IAuthContext | null>(null)

const appReducer = (state: AuthContextState, action: AuthContextAction) => {
  switch (action.type) {
    case "set_user":
      return { ...state, user: action.payload }

    default:
      return initialState
  }
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const value = { state, dispatch }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
