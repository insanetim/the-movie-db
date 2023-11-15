import type { IMovie } from 'src/interfaces/movie.interface'

export interface MoviesListProps {
  handleMovieDelete?: (
    movieId: IMovie['id'],
    event: React.MouseEvent<HTMLSpanElement>
  ) => () => void
  movies: IMovie[]
}
