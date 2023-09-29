import type { IMovie } from 'src/interfaces/movie.interface'

export interface MoviesListProps {
  handleMovieDelete?: (
    movieId: number,
    event: React.MouseEvent<HTMLSpanElement>
  ) => () => void
  movies: IMovie[]
}
