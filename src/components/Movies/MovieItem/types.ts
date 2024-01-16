import { IMovie } from 'src/interfaces/movie.interface'

export type MovieItemProps = {
  handleMovieDelete?: (
    event: React.MouseEvent<HTMLSpanElement>,
    id: IMovie['id']
  ) => void
  id: IMovie['id']
  overview: IMovie['overview']
  posterPath: IMovie['poster_path']
  title: IMovie['title']
}

export type MovieItemHookProps = {
  id: IMovie['id']
}

export type MovieItemHookReturn = {
  handleClick: () => void
}
