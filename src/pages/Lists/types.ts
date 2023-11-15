import type { IListsList } from 'src/interfaces/list.interface'

export interface ListsHook {
  error: null | string
  handleCreateList: () => () => void
  handlePagination: (page: number) => void
  lists: IListsList | null
  loading: boolean
}
