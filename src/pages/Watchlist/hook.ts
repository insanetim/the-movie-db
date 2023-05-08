import { MouseEvent, useEffect } from 'react'
import { Modal } from 'antd'

import type { WatchlistHook } from './types'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import isNull from 'src/utils/helpers/isNull'
import { fetchWatchlist } from 'src/store/watchlist/actions'
import { changeMovieInWatchlist } from 'src/store/movie/actions'
import { accountSelector } from 'src/store/session/selectors'
import {
  watchlistMoviesSelector,
  watchlistLoadingSelector,
  watchlistErrorSelector
} from 'src/store/watchlist/selectors'

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
      dispatch(changeMovieInWatchlist({ movieId, inWatchlist: false }))
    }

    Modal.confirm({
      title: 'Do you want to delete movie from watchlist?',
      onOk
    })

    return onOk
  }

  useEffect(() => {
    if (!isNull(account)) {
      dispatch(fetchWatchlist(1))
    }
  }, [account, dispatch])

  return { movies, loading, error, handlePagination, handleMovieDelete }
}

export default useContainer
