import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import Layout from "components/Layout"
import Input from "components/Input"
import Button from "components/Button"
import authService from "services/auth"
import storage from "utils/storage"
import type { SignUp as ISignUp } from "types/services/auth"
import { AUTH_TOKEN } from "constants/index"
import { setRequestAuthToken } from "utils/request"

interface SignUpFormFields extends ISignUp {
  isLoading: boolean
}

const SignUp = () => {
  const router = useRouter()
  const [state, setState] = useState<SignUpFormFields>({
    email: "",
    password: "",
    fullname: "",
    isLoading: false,
  })

  const handleStateChange = (key, value) => {
    setState((prevState) => ({ ...prevState, [key]: value }))
  }

  const handleSubmit = () => {
    handleStateChange("isLoading", true)
    const { email, fullname, password } = state

    authService
      .signUp({ email, fullname, password })
      .then(
        ({
          username,
          token,
        }: ISignUp & { token: string; username: string }) => {
          setRequestAuthToken(token)
          storage.set(AUTH_TOKEN, token)
          router.push(`/${username}`)
        }
      )
      .catch(() => false)
      .finally(() => {
        handleStateChange("isLoading", false)
      })
  }

  return (
    <Layout title="Sign Up" description="Sign up to tilda">
      <div className="w-full min-h-screen h-full flex justify-center items-center">
        <form className="w-96 p-4 container flex flex-col items-center">
          <h1 className="font-bold text-4xl mb-8 text-slate-900">Sign Up</h1>
          <Input
            name="fullname"
            placeholder="Fullname"
            value={state.fullname}
            onChange={({ target: { name, value } }) =>
              handleStateChange(name, value)
            }
          />
          <Input
            name="email"
            placeholder="Email"
            className="my-4"
            type="email"
            value={state.email}
            onChange={({ target: { name, value } }) =>
              handleStateChange(name, value)
            }
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            className="mb-4"
            value={state.password}
            onChange={({ target: { name, value } }) =>
              handleStateChange(name, value)
            }
          />

          <Button
            type="submit"
            text="Sign Up"
            disabled={state.isLoading}
            onClick={handleSubmit}
          />

          <p className="mt-4 text-sm text-slate-900">
            Already have an account?{" "}
            <Link href="/auth/signin">
              <a className="underline">Sign-in</a>
            </Link>
            .
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default SignUp
