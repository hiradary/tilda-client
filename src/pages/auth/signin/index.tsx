/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import isEmail from "validator/lib/isEmail"

import Layout from "components/Layout"
import Input from "components/Input"
import Button from "components/Button"
import authService from "services/auth/service"
import storage from "utils/storage"
import { AUTH_TOKEN } from "constants/index"

const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [emailOrUsername, setEmailOrUsername] =
    useState<string>("hirad@gmail.com")
  const [password, setPassword] = useState<string>("test123123")
  const router = useRouter()

  const handleSignIn = () => {
    setIsLoading(true)

    const idKey = isEmail(emailOrUsername) ? "email" : "username"

    const formData = {
      password,
      [idKey]: emailOrUsername,
    }

    authService
      .signIn(formData)
      .then(({ token, user }) => {
        storage.set(AUTH_TOKEN, token)
        router.push(`/${user.username}`)
      })
      .catch(() => false)
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Layout title="Sign In" description="Sign in to tilda">
      <div className="w-full min-h-screen h-full flex justify-center items-center">
        <div className="w-96 p-4 container flex flex-col items-center">
          <h1 className="font-bold text-4xl mb-8 text-slate-900">Sign In</h1>
          <Input
            placeholder="Email or Username"
            value={emailOrUsername}
            onChange={({ target: { value } }) => {
              setEmailOrUsername(value)
            }}
          />
          <Input
            placeholder="Password"
            type="password"
            className="my-4"
            value={password}
            onChange={({ target: { value } }) => {
              setPassword(value)
            }}
          />

          <Button text="Sign In" onClick={handleSignIn} disabled={isLoading} />

          <p className="mt-4 text-sm text-slate-900">
            Don't have an account?{" "}
            <Link href="/auth/signup">
              <a className="underline">Sign-up</a>
            </Link>{" "}
            today.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default SignIn
