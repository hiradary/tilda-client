import { ToastContainer } from "react-toastify"
import { ModalContainer } from "reoverlay"
import "react-toastify/dist/ReactToastify.css"
import type { AppProps } from "next/app"

import "styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
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
