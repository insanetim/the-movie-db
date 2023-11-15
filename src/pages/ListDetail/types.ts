import type { IListDetail } from 'src/interfaces/list.interface'
import type { IMovie } from 'src/interfaces/movie.interface'

export interface ListDetailHook {
  error: null | string
  handleListDelete: () => () => Promise<void>
  handleMovieDelete: (
    movieId: IMovie['id'],
    event: React.MouseEvent<HTMLSpanElement>
  ) => () => void
  handlePagination: (page: number) => void
  list: IListDetail | null
  loading: boolean
}
