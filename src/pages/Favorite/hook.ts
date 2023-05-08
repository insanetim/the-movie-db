import { MouseEvent, useEffect } from 'react'
import { Modal } from 'antd'

import type { FavoriteHook } from './types'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import isNull from 'src/utils/helpers/isNull'
import { fetchFavorite } from 'src/store/favorite/actions'
import { changeMovieInFavorite } from 'src/store/movie/actions'
import { accountSelector } from 'src/store/session/selectors'
import { favoriteMoviesSelector, favoriteLoadingSelector, favoriteErrorSelector } from 'src/store/favorite/selectors'

const useContainer = (): FavoriteHook => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(accountSelector)
  const movies = useAppSelector(favoriteMoviesSelector)
  const loading = useAppSelector(favoriteLoadingSelector)
  const error = useAppSelector(favoriteErrorSelector)

  const handlePagination = (page: number) => {
    dispatch(fetchFavorite(page))
  }

  const handleMovieDelete = (movieId: number, event: MouseEvent<HTMLSpanElement>): (() => void) => {
    event.stopPropagation()

    const onOk = () => {
      dispatch(changeMovieInFavorite({ movieId, inFavorite: false }))
    }

    Modal.confirm({
      title: 'Do you want to delete movie from favorite?',
      onOk
    })

    return onOk
  }

  useEffect(() => {
    if (!isNull(account)) {
      dispatch(fetchFavorite(1))
    }
  }, [account, dispatch])

  return { movies, loading, error, handlePagination, handleMovieDelete }
}

export default useContainer
