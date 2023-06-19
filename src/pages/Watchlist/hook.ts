import { Modal } from 'antd'
import { MouseEvent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { changeMovieInWatchlist } from 'src/store/movie/actions'
import { accountSelector } from 'src/store/session/selectors'
import { fetchWatchlist } from 'src/store/watchlist/actions'
import {
  watchlistErrorSelector,
  watchlistLoadingSelector,
  watchlistMoviesSelector
} from 'src/store/watchlist/selectors'
import isNull from 'src/utils/helpers/isNull'

import type { WatchlistHook } from './types'

const useContainer = (): WatchlistHook => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(accountSelector)
  const movies = useAppSelector(watchlistMoviesSelector)
  const loading = useAppSelector(watchlistLoadingSelector)
  const error = useAppSelector(watchlistErrorSelector)

  const handlePagination = (page: number) => {
    dispatch(fetchWatchlist(page))
  }

  const handleMovieDelete = (movieId: number, event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()

    const onOk = () => {
      dispatch(changeMovieInWatchlist({ inWatchlist: false, movieId }))
    }

    Modal.confirm({
      onOk,
      title: 'Do you want to delete movie from watchlist?'
    })

    return onOk
  }

  useEffect(() => {
    if (!isNull(account)) {
      dispatch(fetchWatchlist(1))
    }
  }, [account, dispatch])

  return { error, handleMovieDelete, handlePagination, loading, movies }
}

export default useContainer
