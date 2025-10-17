import { ErrorMsg, HandlePagination } from 'src/interfaces/global.interface'
import { IListDetails } from 'src/interfaces/list.interface'
import { IMovie } from 'src/interfaces/movie.interface'

export type ListDetailsHookReturn = {
  error: ErrorMsg
  handleListDelete: () => () => Promise<void>
  handleMovieDelete: (
    event: React.MouseEvent<HTMLSpanElement>,
    movieId: IMovie['id']
  ) => () => Promise<void>
  handlePagination: HandlePagination
  isLoading: boolean
  list?: IListDetails
}

export type ListDetailsRouteParams = {
  listSlug: string
}
