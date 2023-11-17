import type { ListData } from 'src/components/ModalCreateList/types'
import type { IState } from 'src/interfaces/global.interface'
import type {
  IList,
  IListDetail,
  IListsList
} from 'src/interfaces/list.interface'
import type { IMovie } from 'src/interfaces/movie.interface'

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

export interface FetchListDetailProps {
  listId: IList['id']
  page: string
}

export interface ListsState {
  createdLists: IState<IListsList>
  listDetail: IState<IListDetail>
}
