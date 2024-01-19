import { ErrorMsg } from 'src/interfaces/global.interface'
import { IMovie } from 'src/interfaces/movie.interface'

export type ChangeMovieInFavoriteProps = {
  inFavorite: boolean
  movieId: IMovie['id']
}

export type ChangeMovieInWatchlistProps = {
  inWatchlist: boolean
  movieId: IMovie['id']
}

export type MovieDetailsState = {
  error: ErrorMsg
  loading: boolean
}
