import type { IList, IListsList } from 'src/interfaces/list.interface'
import type { IMovie } from 'src/interfaces/movie.interface'

export interface PopoverContentProps {
  movieId: IMovie['id']
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface PopoverContentHookProps extends PopoverContentProps {}

export interface PopoverContentHook {
  handleAddToList: (listId: IList['id']) => void
  handleAddToNewList: () => void
  lists: IListsList | null
}
