import { Modal } from 'antd'
import { MouseEvent, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import useRequest from 'src/hooks/useRequest'
import { deleteList, fetchList, removeFromList } from 'src/store/lists/actions'
import { listSelector } from 'src/store/lists/selectors'

import { ListDetailHook } from './types'

const useContainer = (): ListDetailHook => {
  const dispatch = useAppDispatch()
  const list = useAppSelector(listSelector)
  const { listId = '' } = useParams()
  const navigate = useNavigate()
  const { error, loading, request } = useRequest()

  const handleListDelete = () => {
    const onOk = async () => {
      await dispatch(deleteList(listId))
      navigate('/lists')
    }

    Modal.confirm({
      onOk,
      title: 'Do you want to delete list?'
    })

    return onOk
  }

  const handleMovieDelete = (movieId: number, event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()

    const onOk = () => {
      dispatch(removeFromList({ listId, movieId }))
    }

    Modal.confirm({
      onOk,
      title: 'Do you want to delete movie from this list?'
    })

    return onOk
  }

  useEffect(() => {
    request(fetchList(listId))
  }, [listId, request])

  return { error, handleListDelete, handleMovieDelete, list, loading }
}

export default useContainer
