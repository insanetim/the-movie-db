import { MouseEvent } from 'react'
import { IList } from 'src/interfaces/list.interface'

export type ListItemHookProps = {
  listId: IList['id']
  name: IList['name']
}

export type ListItemHookReturn = {
  handleClick: () => void
  handleListDelete: (event: MouseEvent<HTMLSpanElement>) => () => Promise<void>
}

export type ListItemProps = {
  description: IList['description']
  listId: IList['id']
  name: IList['name']
}
