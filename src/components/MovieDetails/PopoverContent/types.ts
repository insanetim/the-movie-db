import { IList, IListsList } from 'src/interfaces/list.interface'
import { IMovie } from 'src/interfaces/movie.interface'
import { ListData } from 'src/store/features/lists'

export type HandleAddToListProps = {
  listId: IList['id']
  listName: string
}

export type PopoverContentHookProps = PopoverContentProps

export type PopoverContentHookReturn = {
  handleAddToList: (props: HandleAddToListProps) => void
  handleAddToNewList: () => {
    onSubmit: (listData: ListData) => Promise<void>
  }
  lists?: IListsList
}

export type PopoverContentProps = {
  movieId: IMovie['id']
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>
}
