import { IList, IListsList } from 'src/interfaces/list.interface'
import { IMovie } from 'src/interfaces/movie.interface'

export type HandleAddToListProps = {
  listId: IList['id']
  listName: string
}

export type PopoverContentHookProps = PopoverContentProps

export type PopoverContentHookReturn = {
  handleAddToList: (props: HandleAddToListProps) => void
  handleAddToNewList: () => void
  lists: IListsList | null
}

export type PopoverContentProps = {
  movieId: IMovie['id']
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>
}
