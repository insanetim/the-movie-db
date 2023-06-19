import type { IMoviesList } from 'src/interfaces/movie.interface'

export interface TrendingHook {
  error: null | string
  handlePagination: (page: number) => void
  loading: boolean
  movies: IMoviesList | null
}
