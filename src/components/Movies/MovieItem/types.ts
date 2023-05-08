import type { IMovie } from 'src/interfaces/movie.interface'

export interface MovieItemProps {
  movie: IMovie
  handleMovieDelete?: (movieId: number, event: React.MouseEvent<HTMLSpanElement>) => () => void
}

export interface MovieItemHookProps {
  movieId: number
}

export interface MovieItemHook {
  handleClick: () => void
}
