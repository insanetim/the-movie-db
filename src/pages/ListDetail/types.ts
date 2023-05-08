import { IListDetail } from 'src/interfaces/list.interface'

export interface ListDetailHook {
  list: IListDetail | null
  loading: boolean
  error: string | null
  handleListDelete: () => () => Promise<void>
  handleMovieDelete: (movieId: number, event: React.MouseEvent<HTMLSpanElement>) => () => void
}
