import { IMovie } from 'src/interfaces/movie.interface'

export type MoviesListProps = {
  handleMovieDelete?: (
    event: React.MouseEvent<HTMLSpanElement>,
    id: IMovie['id']
  ) => void
  movies: IMovie[]
}
