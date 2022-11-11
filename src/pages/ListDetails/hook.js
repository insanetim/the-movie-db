import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal } from 'antd'

import { deleteList, removeFromList, fetchList } from 'src/state/lists/actions'
import { listSelector } from 'src/state/lists/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const list = useSelector(listSelector)
  const navigate = useNavigate()
  const { listId } = useParams()
  const [loading, setLoading] = useState(true)

  const handleListDelete = () => {
    const cb = () => {
      navigate('/lists')
    }
    const onOk = () => {
      dispatch(deleteList(listId, cb))
    }
    Modal.confirm({
      title: 'Do you want to delete list?',
      onOk
    })

    return { cb, onOk }
  }

  const handleMovieDelete = (event, movieId) => {
    event.stopPropagation()
    const onOk = () => {
      dispatch(removeFromList({ listId, movieId }))
    }
    Modal.confirm({
      title: 'Do you want to delete movie from this list?',
      onOk
    })

    return onOk
  }

  const onFinish = () => setLoading(false)

  useEffect(() => {
    dispatch(fetchList(listId, onFinish))
  }, [listId])

  return { list, loading, handleListDelete, handleMovieDelete, onFinish }
}

export default useContainer
