import { useSelector } from 'react-redux'
import { modalComponentsMap } from 'src/components/ModalRoot/modalComponents'
import { useAppDispatch } from 'src/hooks/useRedux'
import { showModal } from 'src/store/app/actions'
import { addToList } from 'src/store/createdLists/actions'
import { createdListsSelector } from 'src/store/createdLists/selectors'

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
  const lists = useSelector(createdListsSelector)

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
