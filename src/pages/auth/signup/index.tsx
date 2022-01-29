/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import Layout from "components/Layout"
import Input from "components/Input"
import Button from "components/Button"

const SignUp = () => {
  return (
    <Layout title="Sign Up" description="Sign up to tilda">
      <div className="w-full min-h-screen h-full flex justify-center items-center">
        <div className="w-96 p-4 container flex flex-col items-center">
          <h1 className="font-bold text-4xl mb-8 text-slate-900">Sign Up</h1>
          <Input placeholder="Fullname" />
          <Input placeholder="Email" className="my-4" />
          <Input placeholder="Password" type="password" className="mb-4" />

          <Button text="Sign Up" />

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
