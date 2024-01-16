import { ErrorMsg, HandlePagination } from 'src/interfaces/global.interface'
import { IMoviesList } from 'src/interfaces/movie.interface'

export type TrendingHookReturn = {
  error: ErrorMsg
  handlePagination: HandlePagination
  loading: boolean
  movies: IMoviesList | null
}
