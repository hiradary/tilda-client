import axios, { AxiosRequestConfig } from "axios"
import { toast } from "react-toastify"
import useSWR from "swr"

import { flattenRequest } from "utils/requestUtils"
import type { ApplicationRequest } from "./useService"

const useRequest = (request: ApplicationRequest | null) => {
  const {
    data: response,
    error,
    isValidating,
    mutate,
  } = useSWR(
    request ? flattenRequest(request) : null,
    () => axios(request as AxiosRequestConfig),
    {
      onErrorRetry: (error, key, option, revalidate, { retryCount }) => {
        console.log(error)

        if (retryCount) {
          if (retryCount > 3) return
          if (retryCount > 2)
            toast.error(
              "هنگام فراخوانی سرویس مشکلی پیش آمد! لطفا مجددا تلاش کنید"
            )
        }
        setTimeout(
          () => revalidate({ retryCount: (retryCount || 0) + 1 }),
          2000
        )
      },

      shouldRetryOnError: true,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      errorRetryCount: 3,
      dedupingInterval: 0,
      errorRetryInterval: 3000,
    }
  )

  return {
    response,
    error,
    isValidating,
    mutate,
  }
}

export default useRequest
