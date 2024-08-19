export type ErrorMsg = null | string

export type Query = string

export type HandlePagination = (page: number) => void

export interface IState<T> {
  data: null | T
  error: ErrorMsg
  loading: boolean
}

export interface IResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}
