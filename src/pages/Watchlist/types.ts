import { ErrorMsg, HandlePagination } from 'src/interfaces/global.interface'
import { IMovie, IMoviesList } from 'src/interfaces/movie.interface'

export type WatchlistHookReturn = {
  error: ErrorMsg
  handleMovieDelete: (
    event: React.MouseEvent<HTMLSpanElement>,
    movieId: IMovie['id']
  ) => () => Promise<void>
  handlePagination: HandlePagination
  loading: boolean
  movies: IMoviesList | null
}
