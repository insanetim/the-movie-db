export type IError = null | string

export type IState<T> = {
  data: T | null
  error: IError
  loading: boolean
}

export type IResponse<T> = {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}
