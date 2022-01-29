import React from "react"
import Head from "next/head"

interface Props {
  title: string
  description: string
}

const Layout: React.FC<Props> = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  )
}

export default Layout
