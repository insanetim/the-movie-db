import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'
import { isEmpty } from 'lodash'

import { requestFavorites } from 'src/state/favorites/actions'
import { changeMovieInFavorites } from 'src/state/movie/actions'
import { accountSelector } from 'src/state/session/selectors'
import { favoritesSelector } from 'src/state/favorites/selectors'

export const useContainer = () => {
  const dispatch = useDispatch()
  const account = useSelector(accountSelector)
  const favorites = useSelector(favoritesSelector)

  const handlePagination = page => {
    dispatch(requestFavorites(page))
  }

  const handleDelete = (event, movieId) => {
    event.stopPropagation()
    Modal.confirm({
      title: 'Do you want to delete movie from favorites?',
      onOk() {
        dispatch(changeMovieInFavorites({ movieId, inFavorite: false }))
      }
    })
  }

  useEffect(() => {
    if (!isEmpty(account)) {
      dispatch(requestFavorites())
    }
  }, [account])

  return { favorites, handlePagination, handleDelete }
}
