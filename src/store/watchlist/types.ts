import type { IMoviesList } from 'src/interfaces/movie.interface'

export interface IWatchlistState {
  movies: IMoviesList | null
  loading: boolean
  error: string | null
}
