import { useDispatch, useSelector } from 'react-redux'

import { showModal } from 'src/store/app/actions'
import { addToList } from 'src/store/lists/actions'
import { listsSelector } from 'src/store/lists/selectors'

const useContainer = ({ movieId, setPopoverOpen }) => {
  const dispatch = useDispatch()
  const lists = useSelector(listsSelector)

  const handleAddToNewList = () => {
    dispatch(
      showModal({
        modalType: 'CREATE_LIST_MODAL',
        modalProps: { movieId }
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

export default useContainer