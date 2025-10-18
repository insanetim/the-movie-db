import { IMovie } from 'src/interfaces/movie.interface'

export type AddToFavoriteReq = {
  inFavorite: boolean
  movieId: IMovie['id']
}
