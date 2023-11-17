export type IError = null | string

export type IState<T> = {
  data: T | null
  error: IError
  loading: boolean
}
