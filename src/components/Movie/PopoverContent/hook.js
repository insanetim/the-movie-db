import { useDispatch, useSelector } from 'react-redux'
import { addToList, showModal } from 'src/store/actions'

export const useContainer = ({ movieId, setPopoverOpen }) => {
  const dispatch = useDispatch()
  const lists = useSelector(state => state.lists)

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
