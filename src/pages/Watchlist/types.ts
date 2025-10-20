import { ErrorMsg, HandlePagination } from 'src/interfaces/global.interface'
import { IMovie, IMoviesList } from 'src/interfaces/movie.interface'

export type WatchlistHookReturn = {
  error: ErrorMsg
  handleConfirmDeleteMovie: (
    event: React.MouseEvent<HTMLSpanElement>,
    movieId: IMovie['id']
  ) => void
  handleDeleteMovie: (movieId: IMovie['id']) => Promise<void>
  handlePagination: HandlePagination
  isLoading: boolean
  movies?: IMoviesList
}
