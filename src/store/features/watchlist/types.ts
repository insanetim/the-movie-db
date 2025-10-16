import { IMovie } from 'src/interfaces/movie.interface'

export type AddToWatchlistReq = {
  inWatchlist: boolean
  movieId: IMovie['id']
}

export type AddToWatchlistRes = {
  status_code: number
  status_message: string
  success: boolean
}
