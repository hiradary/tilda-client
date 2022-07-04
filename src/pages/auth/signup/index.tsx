import { useState } from "react"
import Link from "next/link"

import Layout from "components/Layout"
import Input from "components/Input"
import Button from "components/Button"

interface SignUpFields {
  email: string
  password: string
  fullname: string
  isLoading: boolean
}

const SignUp = () => {
  const [state, setState] = useState<SignUpFields>({
    email: "",
    password: "",
    fullname: "",
    isLoading: false,
  })

  const handleStateChange = (key, value) => {
    setState((prevState) => ({ ...prevState, [key]: value }))
  }

  const handleSubmit = () => {}

  return (
    <Layout title="Sign Up" description="Sign up to tilda">
      <div className="w-full min-h-screen h-full flex justify-center items-center">
        <div className="w-96 p-4 container flex flex-col items-center">
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
        </div>
      </div>
    </Layout>
  )
}

export default SignUp
