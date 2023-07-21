import { Modal } from 'antd'
import { MouseEvent, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { fetchFavorite } from 'src/store/favorite/actions'
import { favoriteErrorSelector, favoriteLoadingSelector, favoriteMoviesSelector } from 'src/store/favorite/selectors'
import { changeMovieInFavorite } from 'src/store/movie/actions'
import { accountSelector } from 'src/store/session/selectors'
import isNull from 'src/utils/helpers/isNull'

import type { FavoriteHook } from './types'

const useContainer = (): FavoriteHook => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(accountSelector)
  const movies = useAppSelector(favoriteMoviesSelector)
  const loading = useAppSelector(favoriteLoadingSelector)
  const error = useAppSelector(favoriteErrorSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'

  const handlePagination = (page: number) => {
    setSearchParams(new URLSearchParams({ page: page.toString() }))
  }

  const handleMovieDelete = (movieId: number, event: MouseEvent<HTMLSpanElement>): (() => void) => {
    event.stopPropagation()

    const onOk = () => {
      dispatch(changeMovieInFavorite({ inFavorite: false, movieId }))
    }

    Modal.confirm({
      onOk,
      title: 'Do you want to delete movie from favorite?'
    })

    return onOk
  }

  useEffect(() => {
    if (!isNull(account)) {
      dispatch(fetchFavorite(page))
    }
  }, [account, page, dispatch])

  return { error, handleMovieDelete, handlePagination, loading, movies }
}

export default useContainer
