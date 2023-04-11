import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { equals } from 'ramda'

import { changeMovieInFavorites, changeMovieInWatchlist, fetchMovie } from 'src/store/movie/actions'
import { movieSelector, movieLoadingSelector, movieErrorSelector } from 'src/store/movie/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const movie = useSelector(movieSelector, equals)
  const loading = useSelector(movieLoadingSelector)
  const error = useSelector(movieErrorSelector)
  const { movieId } = useParams()
  const [popoverOpen, setPopoverOpen] = useState(false)

  const handleFavoriteClick = () => {
    dispatch(
      changeMovieInFavorites({
        movieId,
        inFavorites: !movie.accountStates.favorite
      })
    )
  }

  const handleWatchlistClick = () => {
    dispatch(
      changeMovieInWatchlist({
        movieId,
        inWatchlist: !movie.accountStates.watchlist
      })
    )
  }

  useEffect(() => {
    dispatch(fetchMovie(movieId))
  }, [dispatch, movieId])

  return {
    movie,
    loading,
    error,
    handleFavoriteClick,
    handleWatchlistClick,
    popoverOpen,
    setPopoverOpen
  }
}

export default useContainer
