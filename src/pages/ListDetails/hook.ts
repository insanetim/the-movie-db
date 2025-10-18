import { Modal } from 'antd'
import { MouseEvent } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useUpdatePage from 'src/hooks/useUpdatePage'
import { IMovie } from 'src/interfaces/movie.interface'
import { removeFromList } from 'src/store/createdLists/actions'
import {
  useDeleteListMutation,
  useGetListDetailsQuery,
} from 'src/store/features/lists'
import { useAppDispatch } from 'src/store/hooks'
import errorMessage from 'src/utils/helpers/errorMessage'
import getIdFromSlug from 'src/utils/helpers/getIdFromSlug'
import getParams from 'src/utils/helpers/getParams'

import { ListDetailsHookReturn, ListDetailsRouteParams } from './types'

const useContainer = (): ListDetailsHookReturn => {
  const { listSlug } = useParams<
    keyof ListDetailsRouteParams
  >() as ListDetailsRouteParams
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const listId = getIdFromSlug(listSlug)

  const {
    data: list,
    error,
    isLoading,
  } = useGetListDetailsQuery({ listId, page })
  const [deleteList] = useDeleteListMutation()

  const { updatePage } = useUpdatePage({
    items: list?.items,
    page,
    setSearchParams,
  })

  const handlePagination = (page: number) => {
    setSearchParams(getParams({ page }))
  }

  const handleListDelete = () => {
    const onOk = async () => {
      await deleteList(listId)
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

  return {
    error: errorMessage(error),
    handleListDelete,
    handleMovieDelete,
    handlePagination,
    isLoading,
    list,
  }
}

export default useContainer
