import { useEffect } from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"

import Layout from "components/Layout"
import StatusView from "components/StatusView"
import { useAuth } from "hooks/useAuth"

const Home: NextPage = () => {
  const user = useAuth((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    const { username } = user

    if (username) {
      router.push(`/${username}`)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.username])

  return (
    <Layout title="Tilda" description="Share your crypto addresses easily.">
      <div className="w-full h-screen flex items-center justify-center">
        <StatusView type="loading" />
      </div>
    </Layout>
  )
}

export default Home
