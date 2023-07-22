import type { IListDetail, IListsList } from 'src/interfaces/list.interface'

import { ListData } from 'src/components/ModalCreateList/types'

export interface IListsState {
  lists: IListsList | null
}

export interface IListState {
  list: IListDetail | null
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
