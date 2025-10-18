import { IMovie } from 'src/interfaces/movie.interface'

export type AddToWatchlistReq = {
  inWatchlist: boolean
  movieId: IMovie['id']
}
