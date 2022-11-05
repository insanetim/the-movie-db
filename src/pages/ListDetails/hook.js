import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal } from 'antd'

import { deleteList, removeFromList, fetchList } from 'src/state/lists/actions'
import { listSelector } from 'src/state/lists/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const list = useSelector(listSelector)
  const { listId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const handleListDelete = () => {
    Modal.confirm({
      title: 'Do you want to delete list?',
      onOk() {
        dispatch(deleteList(listId, () => navigate('/lists')))
      }
    })
  }

  const handleMovieDelete = (event, movieId) => {
    event.stopPropagation()
    Modal.confirm({
      title: 'Do you want to delete movie from this list?',
      onOk() {
        dispatch(removeFromList({ listId, movieId }))
      }
    })
  }

  useEffect(() => {
    dispatch(fetchList(listId, () => setLoading(false)))
  }, [listId])

  return { list, loading, handleListDelete, handleMovieDelete }
}

export default useContainer
