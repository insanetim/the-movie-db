import { IState } from 'src/interfaces/global.interface'
import { IList, IListDetails } from 'src/interfaces/list.interface'

export type FetchListDetailsProps = {
  listId: IList['id']
  page: string
}

export type ListDetailsState = IState<IListDetails>
