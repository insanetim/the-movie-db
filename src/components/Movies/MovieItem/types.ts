import { IMovie } from 'src/interfaces/movie.interface'

export interface MovieItemProps {
  handleMovieDelete?: (
    movieId: IMovie['id'],
    event: React.MouseEvent<HTMLSpanElement>
  ) => () => void
  movie: IMovie
}

export interface MovieItemHookProps {
  movieId: IMovie['id']
}

export interface MovieItemHook {
  handleClick: () => void
}
