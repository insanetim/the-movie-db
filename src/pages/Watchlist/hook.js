import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'
import { not, isEmpty } from 'ramda'

import { fetchWatchlist, setWatchlistPage } from 'src/store/watchlist/actions'
import { changeMovieInWatchlist } from 'src/store/movie/actions'
import { accountSelector } from 'src/store/session/selectors'
import {
  watchlistMoviesSelector,
  watchlistPageSelector,
  watchlistLoadingSelector,
  watchlistErrorSelector
} from 'src/store/watchlist/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const account = useSelector(accountSelector)
  const movies = useSelector(watchlistMoviesSelector)
  const page = useSelector(watchlistPageSelector)
  const loading = useSelector(watchlistLoadingSelector)
  const error = useSelector(watchlistErrorSelector)

  const handlePagination = nextPage => {
    dispatch(setWatchlistPage(nextPage))
  }

  const handleDelete = (movieId, event) => {
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
    if (not(isEmpty(account))) {
      dispatch(fetchWatchlist(page))
    }
  }, [account, page])

  return { movies, loading, error, handlePagination, handleDelete }
}

export default useContainer
