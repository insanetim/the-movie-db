import { Modal } from 'antd'
import { MouseEvent, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import useUpdatePage from 'src/hooks/useUpdatePage'
import { IMovie } from 'src/interfaces/movie.interface'
import { fetchFavorite } from 'src/store/favorite/actions'
import {
  favoriteErrorSelector,
  favoriteLoadingSelector,
  favoriteMoviesSelector,
} from 'src/store/favorite/selectors'
import { selectAccount } from 'src/store/features/auth'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { changeMovieInFavorite } from 'src/store/movieDetails/actions'
import getParams from 'src/utils/helpers/getParams'

import { FavoriteHookReturn } from './types'

const useContainer = (): FavoriteHookReturn => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(selectAccount)
  const movies = useAppSelector(favoriteMoviesSelector)
  const loading = useAppSelector(favoriteLoadingSelector)
  const error = useAppSelector(favoriteErrorSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
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
    if (account) {
      dispatch(fetchFavorite(page))
    }
  }, [account, page, dispatch])

  return { error, handleMovieDelete, handlePagination, loading, movies }
}

export default useContainer
