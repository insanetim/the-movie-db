import { MutationResponse } from 'src/interfaces/global.interface'
import { IList } from 'src/interfaces/list.interface'
import { IMovie } from 'src/interfaces/movie.interface'

export type CreateListRes = MutationResponse & {
  list_id: IList['id']
}

export type GetListDetailsReq = {
  listId: IList['id']
  page: string
}

export type ListData = {
  description: string
  name: string
}

export type MovieListOperationReq = {
  listId: IList['id']
  movieId: IMovie['id']
}
