import type { IMovie, IMoviesList } from 'src/interfaces/movie.interface'

export interface FavoriteHook {
  error: null | string
  handleMovieDelete: (
    movieId: IMovie['id'],
    event: React.MouseEvent<HTMLSpanElement>
  ) => () => void
  handlePagination: (page: number) => void
  loading: boolean
  movies: IMoviesList | null
}
