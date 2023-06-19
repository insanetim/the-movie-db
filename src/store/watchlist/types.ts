import type { IMoviesList } from 'src/interfaces/movie.interface'

export interface IWatchlistState {
  error: null | string
  loading: boolean
  movies: IMoviesList | null
}
