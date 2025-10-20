import { Modal } from 'antd'
import { MouseEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import useHandleError from 'src/hooks/useHandleError'
import useUpdatePage from 'src/hooks/useUpdatePage'
import { IMovie } from 'src/interfaces/movie.interface'
import { selectAccount } from 'src/store/features/auth'
import {
  useAddToFavoriteMutation,
  useGetFavoriteMoviesQuery,
} from 'src/store/features/favorite'
import { useAppSelector } from 'src/store/hooks'
import errorMessage from 'src/utils/helpers/errorMessage'
import getParams from 'src/utils/helpers/getParams'

import { FavoriteHookReturn } from './types'

const useContainer = (): FavoriteHookReturn => {
  const { handleError } = useHandleError()
  const account = useAppSelector(selectAccount)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'

  const {
    data: movies,
    error,
    isLoading,
  } = useGetFavoriteMoviesQuery(page, { skip: !account })
  const [addToFavorite] = useAddToFavoriteMutation()

  const { updatePage } = useUpdatePage({
    items: movies?.results,
    page,
    setSearchParams,
  })

  const handlePagination = (page: number) => {
    setSearchParams(getParams({ page }))
  }

  const handleDeleteMovie = async (movieId: IMovie['id']) => {
    try {
      await addToFavorite({ inFavorite: false, movieId }).unwrap()
      updatePage()
    } catch (error) {
      handleError(error)
    }
  }

  const handleConfirmDeleteMovie = (
    event: MouseEvent<HTMLSpanElement>,
    movieId: IMovie['id']
  ) => {
    event.stopPropagation()

    Modal.confirm({
      onOk: () => handleDeleteMovie(movieId),
      title: 'Do you want to delete movie from favorite?',
    })
  }

  return {
    error: errorMessage(error),
    handleConfirmDeleteMovie,
    handleDeleteMovie,
    handlePagination,
    isLoading,
    movies,
  }
}

export default useContainer
