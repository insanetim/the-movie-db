import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { showModal } from 'src/store/app/actions'
import { addToList } from 'src/store/lists/actions'
import { listsSelector } from 'src/store/lists/selectors'

import {
  HandleAddToListProps,
  PopoverContentHook,
  PopoverContentHookProps
} from './types'

const useContainer = ({
  movieId,
  setPopoverOpen
}: PopoverContentHookProps): PopoverContentHook => {
  const dispatch = useAppDispatch()
  const lists = useAppSelector(listsSelector)

  const handleAddToNewList = () => {
    dispatch(
      showModal({
        modalProps: { movieId },
        modalType: 'MODAL_CREATE_LIST'
      })
    )
    setPopoverOpen(false)
  }

  const handleAddToList = ({ listId, listName }: HandleAddToListProps) => {
    dispatch(addToList({ listId, listName, movieId }))
    setPopoverOpen(false)
  }

  return { handleAddToList, handleAddToNewList, lists }
}

export default useContainer
