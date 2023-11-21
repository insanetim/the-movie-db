import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { IList } from 'src/interfaces/list.interface'
import { showModal } from 'src/store/app/actions'
import { addToList } from 'src/store/lists/actions'
import { listsSelector } from 'src/store/lists/selectors'

import { PopoverContentHook, PopoverContentHookProps } from './types'

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

  const handleAddToList = (listId: IList['id']) => {
    dispatch(addToList({ listId, movieId }))
    setPopoverOpen(false)
  }

  return { handleAddToList, handleAddToNewList, lists }
}

export default useContainer
