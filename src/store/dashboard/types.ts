import type { IMoviesList } from 'src/interfaces/movie.interface'

export interface IDashboardState {
  movies: IMoviesList | null
  page: number
  loading: boolean
  error: string | null
}

export interface FetchSearchProps {
  page: number
  query: string | null
}
