import { IMovie } from 'src/interfaces/movie.interface'

export type AddToFavoriteReq = {
  inFavorite: boolean
  movieId: IMovie['id']
}

export type AddToFavoriteRes = {
  status_code: number
  status_message: string
  success: boolean
}
