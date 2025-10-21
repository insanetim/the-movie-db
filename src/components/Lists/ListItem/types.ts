import { MouseEvent } from 'react'
import { IList } from 'src/interfaces/list.interface'

export type ListItemHookProps = {
  listId: IList['id']
  name: IList['name']
}

export type ListItemHookReturn = {
  handleConfirmDeleteList: (event: MouseEvent<HTMLSpanElement>) => void
  handleDeleteList: () => Promise<void>
  handleNavigateToList: () => void
}

export type ListItemProps = {
  description: IList['description']
  listId: IList['id']
  name: IList['name']
}
