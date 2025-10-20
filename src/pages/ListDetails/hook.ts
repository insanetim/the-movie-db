import { Modal } from 'antd'
import { MouseEvent } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useHandleError from 'src/hooks/useHandleError'
import useUpdatePage from 'src/hooks/useUpdatePage'
import { IMovie } from 'src/interfaces/movie.interface'
import {
  useDeleteListMutation,
  useGetListDetailsQuery,
  useRemoveMovieFromListMutation,
} from 'src/store/features/list'
import errorMessage from 'src/utils/helpers/errorMessage'
import getIdFromSlug from 'src/utils/helpers/getIdFromSlug'
import getParams from 'src/utils/helpers/getParams'

import { ListDetailsHookReturn, ListDetailsRouteParams } from './types'

const useContainer = (): ListDetailsHookReturn => {
  const navigate = useNavigate()
  const { listSlug } = useParams<
    keyof ListDetailsRouteParams
  >() as ListDetailsRouteParams
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const listId = getIdFromSlug(listSlug)
  const { handleError } = useHandleError()

  const {
    data: list,
    error,
    isLoading,
  } = useGetListDetailsQuery({ listId, page })
  const [deleteList] = useDeleteListMutation()
  const [removeMovieFromList] = useRemoveMovieFromListMutation()

  const { updatePage } = useUpdatePage({
    items: list?.items,
    page,
    setSearchParams,
  })

  const handlePagination = (page: number) => {
    setSearchParams(getParams({ page }))
  }

  const handleDeleteList = async () => {
    try {
      await deleteList(listId).unwrap()
      navigate('/lists')
    } catch (error) {
      handleError(error)
    }
  }

  const handleDeleteMovie = async (movieId: IMovie['id']) => {
    try {
      await removeMovieFromList({ listId, movieId }).unwrap()
      updatePage()
    } catch (error) {
      handleError(error)
    }
  }

  const handleConfirmDeleteList = () => {
    Modal.confirm({
      onOk: () => handleDeleteList(),
      title: 'Do you want to delete list?',
    })
  }

  const handleConfirmDeleteMovie = (
    event: MouseEvent<HTMLSpanElement>,
    movieId: IMovie['id']
  ) => {
    event.stopPropagation()

    Modal.confirm({
      onOk: () => handleDeleteMovie(movieId),
      title: 'Do you want to delete movie from this list?',
    })
  }

  return {
    error: errorMessage(error),
    handleConfirmDeleteList,
    handleConfirmDeleteMovie,
    handleDeleteList,
    handleDeleteMovie,
    handlePagination,
    isLoading,
    list,
  }
}

export default useContainer
