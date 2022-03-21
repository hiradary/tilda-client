/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

import Layout from "components/Layout"
import Input from "components/Input"
import Button from "components/Button"
import { signIn } from "lib/auth"
import storage from "utils/storage"

const SignIn = () => {
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("hirad@gmail.com")
  const [password, setPassword] = useState<string>("test123123")
  const router = useRouter()

  const handleSignIn = () => {
    setBtnLoading(true)
    signIn({ email, password })
      .then(({ token, user: { username, name } }) => {
        storage.set("AUTH_TOKEN", token)
        router.push(`/${username}`)
      })
      .catch(() => {})
      .finally(() => {
        setBtnLoading(false)
      })
  }

  return (
    <Layout title="Sign In" description="Sign in to tilda">
      <div className="w-full min-h-screen h-full flex justify-center items-center">
        <div className="w-96 p-4 container flex flex-col items-center">
          <h1 className="font-bold text-4xl mb-8 text-slate-900">Sign In</h1>
          <Input
            placeholder="Email or Username"
            value={email}
            onChange={({ target: { value } }) => {
              setEmail(value)
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

          <Button text="Sign In" onClick={handleSignIn} loading={btnLoading} />

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
