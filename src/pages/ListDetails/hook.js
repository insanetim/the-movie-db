import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal } from 'antd'

import { deleteList, removeFromList, fetchList } from 'src/state/lists/actions'
import { listSelector, listErrorSelector, listLoadingSelector } from 'src/state/lists/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const list = useSelector(listSelector)
  const loading = useSelector(listLoadingSelector)
  const error = useSelector(listErrorSelector)
  const navigate = useNavigate()
  const { listId } = useParams()

  const handleListDelete = () => {
    const onOk = async () => {
      await dispatch(deleteList(listId))
      navigate('/lists')
    }

    Modal.confirm({
      title: 'Do you want to delete list?',
      onOk
    })

    return onOk
  }

  const handleMovieDelete = (movieId, event) => {
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

  useEffect(() => {
    dispatch(fetchList(listId))
  }, [listId])

  return { list, loading, error, handleListDelete, handleMovieDelete }
}

export default useContainer
