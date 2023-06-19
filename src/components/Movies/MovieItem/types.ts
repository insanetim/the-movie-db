import type { IMovie } from 'src/interfaces/movie.interface'

export interface MovieItemProps {
  handleMovieDelete?: (movieId: number, event: React.MouseEvent<HTMLSpanElement>) => () => void
  movie: IMovie
}

export interface MovieItemHookProps {
  movieId: number
}

export interface MovieItemHook {
  handleClick: () => void
}
