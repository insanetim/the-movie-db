import { IList } from 'src/interfaces/list.interface'

export type GetListDetailsReq = {
  listId: IList['id']
  page: string
}
