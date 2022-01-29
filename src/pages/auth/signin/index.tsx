/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import Layout from "components/Layout"
import Input from "components/Input"
import Button from "components/Button"

const SignIn = () => {
  return (
    <Layout title="Sign In" description="Sign in to tilda">
      <div className="w-full min-h-screen h-full flex justify-center items-center">
        <div className="w-96 p-4 container flex flex-col items-center">
          <h1 className="font-bold text-4xl mb-8 text-slate-900">Sign In</h1>
          <Input placeholder="Email or Username" />
          <Input placeholder="Password" type="password" className="my-4" />

          <Button text="Sign In" />

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
