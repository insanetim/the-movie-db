import { useDispatch, useSelector } from 'react-redux'

import { showModal } from 'src/state/app/actions'
import { addToList } from 'src/state/lists/actions'
import { listsSelector } from 'src/state/lists/selectors'

export const useContainer = ({ movieId, setPopoverOpen }) => {
  const dispatch = useDispatch()
  const lists = useSelector(listsSelector)

  const handleAddToNewList = () => {
    dispatch(
      showModal({
        modalType: 'CREATE_LIST_MODAL',
        modalProps: {
          cb: listId => {
            dispatch(addToList({ listId, movieId }))
          }
        }
      })
    )
    setPopoverOpen(false)
  }

  const handleAddToList = listId => {
    dispatch(addToList({ listId, movieId }))
    setPopoverOpen(false)
  }

  return { lists, handleAddToNewList, handleAddToList }
}
