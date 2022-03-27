export type Status = "init" | "loading" | "loaded" | "error"

interface ServiceBase {
  mutateService?: any | undefined
}

interface ServiceInit extends ServiceBase {
  status: "init"
}

interface ServiceLoading extends ServiceBase {
  status: "loading"
}

interface ServiceLoaded<T> extends ServiceBase {
  status: "loaded"
  payload: T
}

interface ServiceError extends ServiceBase {
  status: "error"
  error: Error
  errorCode: number
}

export type Service<T> =
  | ServiceInit
  | ServiceLoading
  | ServiceLoaded<T>
  | ServiceError
