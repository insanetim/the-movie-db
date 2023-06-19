import type { IListDetail, IListsList } from 'src/interfaces/list.interface'

import { ListData } from 'src/components/ModalCreateList/types'

export interface IListsState {
  error: null | string
  lists: IListsList | null
  loading: boolean
}

export interface IListState {
  error: null | string
  list: IListDetail | null
  loading: boolean
}

export type ListId = number | string

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
