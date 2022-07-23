import { useEffect } from "react"
import { ToastContainer } from "react-toastify"
import { ModalContainer } from "reoverlay"
import "react-toastify/dist/ReactToastify.css"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"

import { useAuth } from "hooks/useAuth"
import profileService from "services/profile"
import "styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  const setUser = useAuth((state) => state.setUser)
  const router = useRouter()

  const { getMyProfile } = profileService

  useEffect(() => {
    getMyProfile()
      .then(setUser)
      .catch(() => router.push(`/auth/signin`))
  }, [])

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ModalContainer />
    </>
  )
}

export default MyApp
