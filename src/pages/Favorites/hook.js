import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'
import * as R from 'ramda'

import { fetchFavorites } from 'src/state/favorites/actions'
import { changeMovieInFavorites } from 'src/state/movie/actions'
import { accountSelector } from 'src/state/session/selectors'
import { favoritesSelector } from 'src/state/favorites/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const account = useSelector(accountSelector)
  const favorites = useSelector(favoritesSelector)

  const handlePagination = page => {
    dispatch(fetchFavorites(page))
  }

  const handleDelete = (event, movieId) => {
    event.stopPropagation()
    Modal.confirm({
      title: 'Do you want to delete movie from favorites?',
      onOk() {
        dispatch(changeMovieInFavorites({ movieId, inFavorites: false }))
      }
    })
  }

  useEffect(() => {
    if (R.not(R.isEmpty(account))) {
      dispatch(fetchFavorites())
    }
  }, [account])

  return { favorites, handlePagination, handleDelete }
}

export default useContainer
