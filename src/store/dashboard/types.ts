import type { IMoviesList } from 'src/interfaces/movie.interface'

export interface IDashboardState {
  movies: IMoviesList | null
}

export interface FetchSearchProps {
  page: string
  query: string
}
