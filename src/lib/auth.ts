import axios from "axios"
import useSWR, { Key } from "swr"

import storage from "utils/storage"

interface SignIn {
  email: string
  password: string
}

const signIn = ({ email, password }: SignIn) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/auth/signin", { email, password })
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

const useUser = (key: Key, username) => {
  const fetcher = async () => {
    const data = await axios.get(`/users/${username}`)
    return data.data
  }

  const { data, error } = useSWR(username ? key : null, fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export { signIn, useUser }
