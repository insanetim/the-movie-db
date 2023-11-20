import type { IResponse } from './global.interface'
import type { IMovie } from './movie.interface'

export interface IList {
  description: string
  favorite_count: number
  id: number | string
  iso_639_1: string
  item_count: number
  list_type: string
  name: string
  poster_path: null | string
}

export interface IListDetail extends IList {
  created_by: string
  items: IMovie[]
  page: number
  total_pages: number
  total_results: number
}

export type IListsList = IResponse<IList>
