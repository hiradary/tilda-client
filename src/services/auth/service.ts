import request from "utils/request"
import type { SignIn, SignUp, SignInResponse } from "types/services/auth"

const authService = {
  signUp: (data: SignUp) => {},
  signIn: (data: SignIn): Promise<SignInResponse> => {
    return new Promise((resolve, reject) => {
      request
        .post("/auth/signin", data)
        .then(({ data }) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}

export default authService
