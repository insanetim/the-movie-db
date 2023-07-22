import { Modal } from 'antd'
import { MouseEvent, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import useRequest from 'src/hooks/useRequest'
import { changeMovieInWatchlist } from 'src/store/movie/actions'
import { accountSelector } from 'src/store/session/selectors'
import { fetchWatchlist } from 'src/store/watchlist/actions'
import { watchlistMoviesSelector } from 'src/store/watchlist/selectors'
import isNull from 'src/utils/helpers/isNull'

import type { WatchlistHook } from './types'

const useContainer = (): WatchlistHook => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(accountSelector)
  const movies = useAppSelector(watchlistMoviesSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const { error, loading, request } = useRequest()

  const handlePagination = (page: number) => {
    setSearchParams(new URLSearchParams({ page: page.toString() }))
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
      request(fetchWatchlist(page))
    }
  }, [account, page, request])

  return { error, handleMovieDelete, handlePagination, loading, movies }
}

export default useContainer
