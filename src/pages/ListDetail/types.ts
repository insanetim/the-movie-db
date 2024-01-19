import { ErrorMsg, HandlePagination } from 'src/interfaces/global.interface'
import { IListDetails } from 'src/interfaces/list.interface'
import { IMovie } from 'src/interfaces/movie.interface'

export type ListDetailHookReturn = {
  error: ErrorMsg
  handleListDelete: () => () => Promise<void>
  handleMovieDelete: (
    event: React.MouseEvent<HTMLSpanElement>,
    movieId: IMovie['id']
  ) => () => Promise<void>
  handlePagination: HandlePagination
  list: IListDetails | null
  loading: boolean
}

export type ListDetailRouteParams = {
  listId: string
}
