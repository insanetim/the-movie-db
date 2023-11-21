import { IList } from 'src/interfaces/list.interface'

export interface ListItemProps {
  list: IList
}

export interface ListItemHookProps {
  listId: IList['id']
}

export interface ListItemHook {
  handleClick: () => void
  handleListDelete: (event: React.MouseEvent<HTMLSpanElement>) => () => void
}
