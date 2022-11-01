import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'
import * as R from 'ramda'

import { requestWatchlist } from 'src/state/watchlist/actions'
import { changeMovieInWatchlist } from 'src/state/movie/actions'
import { accountSelector } from 'src/state/session/selectors'
import { watchlistSelector } from 'src/state/watchlist/selectors'

export const useContainer = () => {
  const dispatch = useDispatch()
  const account = useSelector(accountSelector)
  const watchlist = useSelector(watchlistSelector)

  const handlePagination = page => {
    dispatch(requestWatchlist(page))
  }

  const handleDelete = (event, movieId) => {
    event.stopPropagation()
    Modal.confirm({
      title: 'Do you want to delete movie from watchlist?',
      onOk() {
        dispatch(changeMovieInWatchlist({ movieId, inWatchlist: false }))
      }
    })
  }

  useEffect(() => {
    if (R.not(R.isEmpty(account))) {
      dispatch(requestWatchlist())
    }
  }, [account])

  return { watchlist, handlePagination, handleDelete }
}
