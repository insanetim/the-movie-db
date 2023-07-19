import type { IMoviesList } from 'src/interfaces/movie.interface'

export interface IDashboardState {
  error: null | string
  loading: boolean
  movies: IMoviesList | null
}

export interface FetchSearchProps {
  page: string
  query: string
}
