import { useDispatch, useSelector } from 'react-redux'

import { showModal } from 'src/state/app/actions'
import { addToList } from 'src/state/lists/actions'
import { listsSelector } from 'src/state/lists/selectors'

const useContainer = ({ movieId, setPopoverOpen }) => {
  const dispatch = useDispatch()
  const lists = useSelector(listsSelector)
  const cb = listId => dispatch(addToList({ listId, movieId }))

  const handleAddToNewList = () => {
    dispatch(
      showModal({
        modalType: 'CREATE_LIST_MODAL',
        modalProps: { cb }
      })
    )
    setPopoverOpen(false)
  }

  const handleAddToList = listId => {
    dispatch(addToList({ listId, movieId }))
    setPopoverOpen(false)
  }

  return { lists, handleAddToNewList, handleAddToList, cb }
}

export default useContainer
