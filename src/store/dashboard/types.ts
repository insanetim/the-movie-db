import type { IMoviesList } from 'src/interfaces/movie.interface'

export interface FetchSearchProps {
  page: string
  query: string
}

export interface DashboardState {
  data: IMoviesList | null
}
