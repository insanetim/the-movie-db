import { MouseEvent, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal } from 'antd'

import { deleteList, removeFromList, fetchList } from 'src/store/lists/actions'
import { listSelector, listErrorSelector, listLoadingSelector } from 'src/store/lists/selectors'
import { ListDetailHook } from './types'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'

const useContainer = (): ListDetailHook => {
  const dispatch = useAppDispatch()
  const list = useAppSelector(listSelector)
  const loading = useAppSelector(listLoadingSelector)
  const error = useAppSelector(listErrorSelector)
  const { listId = '' } = useParams()
  const navigate = useNavigate()

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

  const handleMovieDelete = (movieId: number, event: MouseEvent<HTMLSpanElement>) => {
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
  }, [dispatch, listId])

  return { list, loading, error, handleListDelete, handleMovieDelete }
}

export default useContainer
