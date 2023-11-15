import type { ListData } from 'src/components/ModalCreateList/types'
import type {
  IList,
  IListDetail,
  IListsList
} from 'src/interfaces/list.interface'
import type { IMovie } from 'src/interfaces/movie.interface'

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

export interface CreateListProps {
  listData: ListData
  movieId?: IMovie['id']
}

export interface CreateListResponse {
  list_id: number
  status_code: number
  status_message: string
  success: boolean
}

export interface AddToListProps {
  listId: IList['id']
  movieId: IMovie['id']
}

export interface RemoveFromListProps extends AddToListProps {}

export interface fetchListDetailProps {
  listId: IList['id']
  page: string
}
