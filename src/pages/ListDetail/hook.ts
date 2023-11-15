import type { IMovie } from 'src/interfaces/movie.interface'

import { Modal } from 'antd'
import { MouseEvent, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import useUpdatePage from 'src/hooks/useUpdatePage'
import {
  deleteList,
  fetchListDetail,
  removeFromList
} from 'src/store/lists/actions'
import {
  listDetailErrorSelector,
  listDetailLoadingSelector,
  listDetailSelector
} from 'src/store/lists/selectors'
import getParams from 'src/utils/helpers/getParams'

import type { ListDetailHook } from './types'

const useContainer = (): ListDetailHook => {
  const { listId = '' } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const list = useAppSelector(listDetailSelector)
  const loading = useAppSelector(listDetailLoadingSelector)
  const error = useAppSelector(listDetailErrorSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const { updatePage } = useUpdatePage({
    action: fetchListDetail({ listId, page }),
    items: list?.items,
    page,
    setSearchParams
  })

  const handlePagination = (page: number) => {
    setSearchParams(getParams({ page }))
  }

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

  const handleMovieDelete = (
    movieId: IMovie['id'],
    event: MouseEvent<HTMLSpanElement>
  ) => {
    event.stopPropagation()

    const onOk = async () => {
      await dispatch(removeFromList({ listId, movieId }))
      updatePage()
    }

    Modal.confirm({
      onOk,
      title: 'Do you want to delete movie from this list?'
    })

    return onOk
  }

  useEffect(() => {
    dispatch(fetchListDetail({ listId, page }))
  }, [page, listId, dispatch])

  return {
    error,
    handleListDelete,
    handleMovieDelete,
    handlePagination,
    list,
    loading
  }
}

export default useContainer
