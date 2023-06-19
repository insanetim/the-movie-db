import type { IMoviesList } from 'src/interfaces/movie.interface'

export interface IFavoriteState {
  error: null | string
  loading: boolean
  movies: IMoviesList | null
}
