import { Query } from 'src/interfaces/global.interface'
import { IMoviesList } from 'src/interfaces/movie.interface'

export type FetchSearchProps = {
  page: string
  query: Query
}

export type DashboardState = {
  data: IMoviesList | null
}
