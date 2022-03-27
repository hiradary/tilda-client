import { useEffect, useState } from "react"
import { AxiosRequestConfig } from "axios"

import useRequest from "./useRequest"
import type { Service } from "types/hooks/useService"
import { flattenRequest } from "utils/requestUtils"

export interface ApplicationRequest
  extends Pick<
    AxiosRequestConfig,
    "url" | "baseURL" | "method" | "params" | "data"
  > {
  cacheKey?: number
  mockData?: any
}

const useService = <T>(request: ApplicationRequest | null): Service<T> => {
  const [result, setResult] = useState<Service<T>>({
    status: "loading",
  })

  if (result.status !== "loaded" && request?.mockData != null) {
    setResult({
      status: "loaded",
      payload: request.mockData,
    })
  }

  const { error, isValidating, mutate, response } = useRequest(request || null)

  useEffect(() => {
    if (request && result.status !== "loading") {
      setResult({
        status: "loading",
      })
    }

    return () => {
      setResult({
        status: "loading",
      })
    }
  }, [flattenRequest(request), response])

  if (
    response &&
    !isValidating &&
    response.status > 199 &&
    response.status < 300 &&
    result.status !== "loaded"
  ) {
    setResult({
      status: "loaded",
      payload: response.data,
      mutateService: mutate,
    })
  }

  if (error && !isValidating && result.status !== "error") {
    // toast biz logical error
    if (error.response?.status === 400) console.error(error)
    setResult({
      status: "error",
      error: error,
      errorCode: error.response?.status || 400,
    })
  }

  return result
}

export default useService
