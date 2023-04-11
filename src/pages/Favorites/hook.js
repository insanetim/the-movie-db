import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'
import { not, isEmpty } from 'ramda'

import { fetchFavorites, setFavoritesPage } from 'src/store/favorites/actions'
import { changeMovieInFavorites } from 'src/store/movie/actions'
import { accountSelector } from 'src/store/session/selectors'
import {
  favoritesMoviesSelector,
  favoritesPageSelector,
  favoritesLoadingSelector,
  favoritesErrorSelector
} from 'src/store/favorites/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const account = useSelector(accountSelector)
  const movies = useSelector(favoritesMoviesSelector)
  const page = useSelector(favoritesPageSelector)
  const loading = useSelector(favoritesLoadingSelector)
  const error = useSelector(favoritesErrorSelector)

  const handlePagination = nextPage => {
    dispatch(setFavoritesPage(nextPage))
  }

  const handleDelete = (movieId, event) => {
    event.stopPropagation()
    const onOk = () => {
      dispatch(changeMovieInFavorites({ movieId, inFavorites: false }))
    }
    Modal.confirm({
      title: 'Do you want to delete movie from favorites?',
      onOk
    })

    return onOk
  }

  useEffect(() => {
    if (not(isEmpty(account))) {
      dispatch(fetchFavorites(page))
    }
  }, [account, dispatch, page])

  return { movies, loading, error, handlePagination, handleDelete }
}

export default useContainer
