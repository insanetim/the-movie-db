import { Modal } from 'antd'
import { isNotNil } from 'ramda'
import { MouseEvent, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import useUpdatePage from 'src/hooks/useUpdatePage'
import { IMovie } from 'src/interfaces/movie.interface'
import { accountSelector } from 'src/store/auth/selectors'
import { changeMovieInWatchlist } from 'src/store/movie/actions'
import { fetchWatchlist } from 'src/store/watchlist/actions'
import {
  watchlistErrorSelector,
  watchlistLoadingSelector,
  watchlistMoviesSelector,
} from 'src/store/watchlist/selectors'
import getParams from 'src/utils/helpers/getParams'

import { WatchlistHook } from './types'

const useContainer = (): WatchlistHook => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(accountSelector)
  const movies = useAppSelector(watchlistMoviesSelector)
  const loading = useAppSelector(watchlistLoadingSelector)
  const error = useAppSelector(watchlistErrorSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const { updatePage } = useUpdatePage({
    action: fetchWatchlist(page),
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
      await dispatch(changeMovieInWatchlist({ inWatchlist: false, movieId }))
      updatePage()
    }

    Modal.confirm({
      onOk,
      title: 'Do you want to delete movie from watchlist?',
    })

    return onOk
  }

  useEffect(() => {
    if (isNotNil(account)) {
      dispatch(fetchWatchlist(page))
    }
  }, [account, page, dispatch])

  return { error, handleMovieDelete, handlePagination, loading, movies }
}

export default useContainer
