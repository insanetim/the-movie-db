import { IMovie } from 'src/interfaces/movie.interface'

export interface ChangeMovieInFavoriteProps {
  inFavorite: boolean
  movieId: IMovie['id']
}

export interface ChangeMovieInWatchlistProps {
  inWatchlist: boolean
  movieId: IMovie['id']
}
