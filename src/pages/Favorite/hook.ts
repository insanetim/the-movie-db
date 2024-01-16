import { Modal } from 'antd'
import { isNotNil } from 'ramda'
import { MouseEvent, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from 'src/hooks/useRedux'
import useUpdatePage from 'src/hooks/useUpdatePage'
import { IMovie } from 'src/interfaces/movie.interface'
import { accountSelector } from 'src/store/auth/selectors'
import { fetchFavorite } from 'src/store/favorite/actions'
import {
  favoriteErrorSelector,
  favoriteLoadingSelector,
  favoriteMoviesSelector,
} from 'src/store/favorite/selectors'
import { changeMovieInFavorite } from 'src/store/movie/actions'
import getParams from 'src/utils/helpers/getParams'

import { FavoriteHookReturn } from './types'

const useContainer = (): FavoriteHookReturn => {
  const dispatch = useAppDispatch()
  const account = useSelector(accountSelector)
  const movies = useSelector(favoriteMoviesSelector)
  const loading = useSelector(favoriteLoadingSelector)
  const error = useSelector(favoriteErrorSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const { updatePage } = useUpdatePage({
    action: fetchFavorite(page),
    items: movies?.results,
    page,
    setSearchParams,
  })

  const handlePagination = (page: number) => {
    setSearchParams(getParams({ page }))
  }

  const handleMovieDelete = (
    event: MouseEvent<HTMLSpanElement>,
    movieId: IMovie['id']
  ) => {
    event.stopPropagation()

    const onOk = async () => {
      await dispatch(changeMovieInFavorite({ inFavorite: false, movieId }))
      updatePage()
    }

    Modal.confirm({
      onOk,
      title: 'Do you want to delete movie from favorite?',
    })

    return onOk
  }

  useEffect(() => {
    if (isNotNil(account)) {
      dispatch(fetchFavorite(page))
    }
  }, [account, page, dispatch])

  return { error, handleMovieDelete, handlePagination, loading, movies }
}

export default useContainer
