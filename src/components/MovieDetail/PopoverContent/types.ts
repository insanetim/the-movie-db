import type { IListsList } from 'src/interfaces/list.interface'

export interface PopoverContentProps {
  movieId: number
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface PopoverContentHookProps extends PopoverContentProps {}

export interface PopoverContentHook {
  handleAddToList: (listId: number) => void
  handleAddToNewList: () => void
  lists: IListsList | null
}
