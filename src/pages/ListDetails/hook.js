import { Modal } from 'antd'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteList, removeFromList, requestList } from 'src/store/actions'

export const useContainer = () => {
  const { listId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const list = useSelector(state => state.list)
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
    dispatch(requestList(listId, () => setLoading(false)))
  }, [listId])

  return { list, loading, handleListDelete, handleMovieDelete }
}
