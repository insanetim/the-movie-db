import { ErrorMsg, HandlePagination } from 'src/interfaces/global.interface'
import { IListsList } from 'src/interfaces/list.interface'
import { ListData } from 'src/store/features/list'

export type ListsHookReturn = {
  error: ErrorMsg
  handleCreateList: (listData: ListData) => Promise<void>
  handleOpenCreateListModal: () => void
  handlePagination: HandlePagination
  isLoading: boolean
  lists?: IListsList
}
