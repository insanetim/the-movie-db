import { IState } from 'src/interfaces/global.interface'
import { IList, IListsList } from 'src/interfaces/list.interface'
import { IMovie } from 'src/interfaces/movie.interface'

import { ListData } from '../features/lists'

export type AddToListProps = {
  listId: IList['id']
  listName: string
  movieId: IMovie['id']
}

export type CreatedListsState = IState<IListsList>

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

export type RemoveFromListProps = {
  listId: IList['id']
  movieId: IMovie['id']
}
