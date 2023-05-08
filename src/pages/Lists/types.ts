import type { IListsList } from 'src/interfaces/list.interface'

export interface ListsHook {
  lists: IListsList | null
  loading: boolean
  error: string | null
  handlePagination: (page: number) => void
  handleCreateList: () => void
}
