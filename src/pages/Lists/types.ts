import { ErrorMsg, HandlePagination } from 'src/interfaces/global.interface'
import { IListsList } from 'src/interfaces/list.interface'

export type ListsHookReturn = {
  error: ErrorMsg
  handleCreateList: () => () => void
  handlePagination: HandlePagination
  lists: IListsList | null
  loading: boolean
}
