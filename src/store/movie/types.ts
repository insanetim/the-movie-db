import { IMovieDetailExtended } from 'src/interfaces/movie.interface'

export interface IMovieState {
  movieDetail: IMovieDetailExtended | null
  loading: boolean
  error: string | null
}

export type MovieId = string | number

export interface ChangeMovieInFavoriteProps {
  movieId: MovieId
  inFavorite: boolean
}

export interface ChangeMovieInWatchlistProps {
  movieId: MovieId
  inWatchlist: boolean
}
