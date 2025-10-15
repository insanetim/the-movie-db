import { modalComponentsMap } from 'src/components/ModalRoot/modalComponents'
import { addToList } from 'src/store/createdLists/actions'
import { createdListsSelector } from 'src/store/createdLists/selectors'
import { showModal } from 'src/store/features/app'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'

import {
  HandleAddToListProps,
  PopoverContentHookProps,
  PopoverContentHookReturn,
} from './types'

const useContainer = ({
  movieId,
  setPopoverOpen,
}: PopoverContentHookProps): PopoverContentHookReturn => {
  const dispatch = useAppDispatch()
  const lists = useAppSelector(createdListsSelector)

  const handleAddToNewList = () => {
    dispatch(
      showModal({
        modalProps: { movieId },
        modalType: modalComponentsMap.MODAL_CREATE_LIST,
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
