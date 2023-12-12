import { IList } from 'src/interfaces/list.interface'

export interface ListItemProps {
  description: IList['description']
  id: IList['id']
  name: IList['name']
}

export interface ListItemHookProps {
  id: IList['id']
}

export interface ListItemHook {
  handleClick: () => void
  handleListDelete: (event: React.MouseEvent<HTMLSpanElement>) => () => void
}
