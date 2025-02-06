import { IState, Query } from 'src/interfaces/global.interface'
import { IMoviesList } from 'src/interfaces/movie.interface'

export type DashboardState = IState<IMoviesList>

export type FetchSearchProps = {
  page: string
  query: Query
}
