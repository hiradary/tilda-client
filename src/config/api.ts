import axios from "axios"
import { toast } from "react-toastify"

import storage from "utils/storage"

const configApi = () => {
  axios.defaults.baseURL = "http://localhost:3001/api"
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded"
  axios.defaults.headers.common["Authorization"] = `Bearer ${storage.get(
    "AUTH_TOKEN"
  )}`
  axios.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response.data
    },
    (error) => {
      //   const response = error.response?.data

      console.log({ error })

      //   toast.error(response.message || error.response.statusText)
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error)
    }
  )
}

export default configApi
