import type { IMovie } from './movie.interface'

export interface IList {
  description: string
  favorite_count: number
  id: number
  iso_639_1: string
  item_count: number
  list_type: string
  name: string
  poster_path: string | null
}

export interface IListDetail extends IList {
  created_by: string
  items: IMovie[]
}

export interface IListsList {
  page: number
  results: IList[]
  total_pages: number
  total_results: number
}
