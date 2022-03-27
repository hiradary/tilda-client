import type { ApplicationRequest } from "hooks/useService"
import type { SignIn, SignUp } from "types/services/auth"

const authService = {
  signUp: (data: SignUp): ApplicationRequest => {
    return {
      url: `/auth/signup`,
      method: "GET",
      data,
    }
  },
  signIn: (data: SignIn): ApplicationRequest => {
    return {
      url: `/auth/signin`,
      method: "POST",
      data,
    }
  },
}

export default authService
