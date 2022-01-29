import type { NextPage } from "next"
import Layout from "components/Layout"

const Home: NextPage = () => {
  return (
    <Layout title="Tilda" description="Share your crypto addresses easily.">
      <h1 className="text-3xl font-normal underline">Hello world!</h1>
    </Layout>
  )
}

export default Home
