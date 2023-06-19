import { IListDetail } from 'src/interfaces/list.interface'

export interface ListDetailHook {
  error: null | string
  handleListDelete: () => () => Promise<void>
  handleMovieDelete: (movieId: number, event: React.MouseEvent<HTMLSpanElement>) => () => void
  list: IListDetail | null
  loading: boolean
}
