import type { IMoviesList } from 'src/interfaces/movie.interface'

export interface IDashboardState {
  error: null | string
  loading: boolean
  movies: IMoviesList | null
  page: number
}

export interface FetchSearchProps {
  page: number
  query: null | string
}
