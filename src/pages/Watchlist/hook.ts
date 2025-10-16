import { Modal } from 'antd'
import { MouseEvent, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import useUpdatePage from 'src/hooks/useUpdatePage'
import { IMovie } from 'src/interfaces/movie.interface'
import { selectAccount } from 'src/store/features/auth'
import { useAddToWatchlistMutation } from 'src/store/features/watchlist'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { fetchWatchlist } from 'src/store/watchlist/actions'
import {
  watchlistErrorSelector,
  watchlistLoadingSelector,
  watchlistMoviesSelector,
} from 'src/store/watchlist/selectors'
import getParams from 'src/utils/helpers/getParams'

import { WatchlistHookReturn } from './types'

const useContainer = (): WatchlistHookReturn => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(selectAccount)
  const movies = useAppSelector(watchlistMoviesSelector)
  const loading = useAppSelector(watchlistLoadingSelector)
  const error = useAppSelector(watchlistErrorSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const { updatePage } = useUpdatePage({
    action: fetchWatchlist(page),
    items: movies?.results,
    page,
    setSearchParams,
  })

  const [addToWatchlist] = useAddToWatchlistMutation()

  const handlePagination = (page: number) => {
    setSearchParams(getParams({ page }))
  }

  const handleMovieDelete = (
    event: MouseEvent<HTMLSpanElement>,
    movieId: IMovie['id']
  ) => {
    event.stopPropagation()

    const onOk = async () => {
      await addToWatchlist({ inWatchlist: false, movieId })
      updatePage()
    }

    Modal.confirm({
      onOk,
      title: 'Do you want to delete movie from watchlist?',
    })

    return onOk
  }

  useEffect(() => {
    if (account) {
      dispatch(fetchWatchlist(page))
    }
  }, [account, page, dispatch])

  return { error, handleMovieDelete, handlePagination, loading, movies }
}

export default useContainer
