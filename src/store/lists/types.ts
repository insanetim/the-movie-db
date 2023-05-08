import { ListData } from 'src/components/ModalCreateList/types'
import type { IListDetail, IListsList } from 'src/interfaces/list.interface'

export interface IListsState {
  lists: IListsList | null
  loading: boolean
  error: string | null
}

export interface IListState {
  list: IListDetail | null
  loading: boolean
  error: string | null
}

export type ListId = string | number

export interface CreateListProps {
  listData: ListData
  movieId?: number
}

export interface CreateListResponse {
  list_id: number
  status_code: number
  status_message: string
  success: boolean
}

export interface AddToListProps {
  listId: ListId
  movieId: number
}

export interface RemoveFromListProps extends AddToListProps {}
