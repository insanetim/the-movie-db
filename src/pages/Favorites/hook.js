import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'
import { isEmpty } from 'lodash'
import { changeMovieInFavorite, requestFavorites } from 'src/store/actions'

export const useContainer = () => {
  const dispatch = useDispatch()
  const account = useSelector(state => state.account)
  const favorites = useSelector(state => state.favorites)

  const handlePagination = page => {
    dispatch(requestFavorites(page))
  }

  const handleDelete = (event, movieId) => {
    event.stopPropagation()
    Modal.confirm({
      title: 'Do you want to delete movie from favorites?',
      onOk() {
        dispatch(changeMovieInFavorite({ movieId, inFavorite: false }))
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
