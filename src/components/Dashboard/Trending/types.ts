import type { IMoviesList } from 'src/interfaces/movie.interface'

export interface TrendingHook {
  movies: IMoviesList | null
  loading: boolean
  error: string | null
  handlePagination: (page: number) => void
}
