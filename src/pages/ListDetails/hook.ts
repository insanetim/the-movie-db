import { Modal } from 'antd'
import { MouseEvent, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from 'src/hooks/useRedux'
import useUpdatePage from 'src/hooks/useUpdatePage'
import { IMovie } from 'src/interfaces/movie.interface'
import { deleteList, removeFromList } from 'src/store/createdLists/actions'
import { fetchListDetails } from 'src/store/listDetails/actions'
import {
  listDetailsErrorSelector,
  listDetailsLoadingSelector,
  listDetailsSelector,
} from 'src/store/listDetails/selectors'
import getIdFromSlug from 'src/utils/helpers/getIdFromSlug'
import getParams from 'src/utils/helpers/getParams'

import { ListDetailsHookReturn, ListDetailsRouteParams } from './types'

const useContainer = (): ListDetailsHookReturn => {
  const { listSlug } = useParams<
    keyof ListDetailsRouteParams
  >() as ListDetailsRouteParams
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const list = useSelector(listDetailsSelector)
  const loading = useSelector(listDetailsLoadingSelector)
  const error = useSelector(listDetailsErrorSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const listId = getIdFromSlug(listSlug)
  const { updatePage } = useUpdatePage({
    action: fetchListDetails({ listId, page }),
    items: list?.items,
    page,
    setSearchParams,
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
      title: 'Do you want to delete list?',
    })

    return onOk
  }

  const handleMovieDelete = (
    event: MouseEvent<HTMLSpanElement>,
    movieId: IMovie['id']
  ) => {
    event.stopPropagation()

    const onOk = async () => {
      await dispatch(removeFromList({ listId, movieId }))
      updatePage()
    }

    Modal.confirm({
      onOk,
      title: 'Do you want to delete movie from this list?',
    })

    return onOk
  }

  useEffect(() => {
    dispatch(fetchListDetails({ listId, page }))
  }, [page, listId, dispatch])

  return {
    error,
    handleListDelete,
    handleMovieDelete,
    handlePagination,
    list,
    loading,
  }
}

export default useContainer
