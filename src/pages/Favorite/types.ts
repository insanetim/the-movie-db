import type { IMoviesList } from 'src/interfaces/movie.interface'

export interface FavoriteHook {
  error: null | string
  handleMovieDelete: (
    movieId: number,
    event: React.MouseEvent<HTMLSpanElement>
  ) => () => void
  handlePagination: (page: number) => void
  loading: boolean
  movies: IMoviesList | null
}
