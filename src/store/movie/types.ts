import { IMovie } from 'src/interfaces/movie.interface'

export type ChangeMovieInFavoriteProps = {
  inFavorite: boolean
  movieId: IMovie['id']
}

export type ChangeMovieInWatchlistProps = {
  inWatchlist: boolean
  movieId: IMovie['id']
}
