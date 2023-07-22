import { IMovieDetailExtended } from 'src/interfaces/movie.interface'

export interface IMovieState {
  movieDetail: IMovieDetailExtended | null
}

export type MovieId = number | string

export interface ChangeMovieInFavoriteProps {
  inFavorite: boolean
  movieId: MovieId
}

export interface ChangeMovieInWatchlistProps {
  inWatchlist: boolean
  movieId: MovieId
}
