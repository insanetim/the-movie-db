import type { IMoviesList } from 'src/interfaces/movie.interface'

export interface FavoriteHook {
  movies: IMoviesList | null
  loading: boolean
  error: string | null
  handlePagination: (page: number) => void
  handleMovieDelete: (movieId: number, event: React.MouseEvent<HTMLSpanElement>) => () => void
}
