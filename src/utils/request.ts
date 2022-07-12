import axios from "axios"
import { toast } from "react-toastify"

import storage from "./storage"
import { AUTH_TOKEN } from "constants/index"

const request = axios.create({
  baseURL: "http://localhost:3001/api",
})

request.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded"

const setRequestAuthToken = (token: string) => {
  request.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

setRequestAuthToken(storage.get(AUTH_TOKEN))

request.interceptors.response.use(
  (response) => {
    console.log({ response })
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  (error) => {
    console.log({ error })
    try {
      const errorMessage = error.response.data.message
      toast.error(errorMessage)
    } catch (err) {
      console.log(err)
    }

    //   toast.error(response.message || error.response.statusText)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default request
export { setRequestAuthToken }
