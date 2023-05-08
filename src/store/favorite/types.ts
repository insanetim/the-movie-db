import type { IMoviesList } from 'src/interfaces/movie.interface'

export interface IFavoriteState {
  movies: IMoviesList | null
  loading: boolean
  error: string | null
}
