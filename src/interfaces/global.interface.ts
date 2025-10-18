export type ErrorMsg = null | string

export type HandlePagination = (page: number) => void

export interface IResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface IState<T> {
  data: null | T
  error: ErrorMsg
  loading: boolean
}

export type MutationResponse = {
  status_code: number
  status_message: string
  success: boolean
}

export type Query = string
