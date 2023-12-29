import { ListData } from 'src/components/ModalRoot/Modals/ModalCreateList/types'
import { IState } from 'src/interfaces/global.interface'
import { IList, IListDetail, IListsList } from 'src/interfaces/list.interface'
import { IMovie } from 'src/interfaces/movie.interface'

export type CreateListProps = {
  listData: ListData
  movieId?: IMovie['id']
}

export type CreateListResponse = {
  list_id: number
  status_code: number
  status_message: string
  success: boolean
}

export type AddToListProps = {
  listId: IList['id']
  listName: string
  movieId: IMovie['id']
}

export type RemoveFromListProps = {
  listId: IList['id']
  movieId: IMovie['id']
}

export type FetchListDetailProps = {
  listId: IList['id']
  page: string
}

export type ListsState = {
  createdLists: IState<IListsList>
  listDetail: IState<IListDetail>
}
