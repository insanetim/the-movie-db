export type ErrorMsg = null | string

export type Query = string

export type HandlePagination = (page: number) => void

export interface IState<T> {
  data: T | null
  error: ErrorMsg
  loading: boolean
}

export interface IResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}
