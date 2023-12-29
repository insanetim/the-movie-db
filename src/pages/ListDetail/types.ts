import { ErrorMsg, HandlePagination } from 'src/interfaces/global.interface'
import { IListDetail } from 'src/interfaces/list.interface'
import { IMovie } from 'src/interfaces/movie.interface'

export type ListDetailHook = {
  error: ErrorMsg
  handleListDelete: () => () => Promise<void>
  handleMovieDelete: (
    event: React.MouseEvent<HTMLSpanElement>,
    movieId: IMovie['id']
  ) => () => Promise<void>
  handlePagination: HandlePagination
  list: IListDetail | null
  loading: boolean
}
