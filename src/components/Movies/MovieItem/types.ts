import { IMovie } from 'src/interfaces/movie.interface'

export interface MovieItemProps {
  handleMovieDelete?: (
    id: IMovie['id'],
    event: React.MouseEvent<HTMLSpanElement>
  ) => () => void
  id: IMovie['id']
  overview: IMovie['overview']
  posterPath: IMovie['poster_path']
  title: IMovie['title']
}

export interface MovieItemHookProps {
  id: IMovie['id']
}

export interface MovieItemHook {
  handleClick: () => void
}
