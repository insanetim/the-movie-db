import type { IMovie } from 'src/interfaces/movie.interface'

export interface MoviesListProps {
  movies: IMovie[]
  handleMovieDelete?: (movieId: number, event: React.MouseEvent<HTMLSpanElement>) => () => void
}
