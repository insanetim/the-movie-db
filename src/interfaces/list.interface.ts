import { IResponse } from './global.interface'
import { IMovie } from './movie.interface'

export interface IList {
  description: string
  id: number | string
  name: string
}

export interface IListDetails extends IList {
  items: IMovie[]
  page: number
  total_pages: number
  total_results: number
}

export type IListsList = IResponse<IList>
