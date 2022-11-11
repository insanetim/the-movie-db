import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as R from 'ramda'

import { changeMovieInFavorites, changeMovieInWatchlist, fetchMovie } from 'src/state/movie/actions'
import { movieSelector } from 'src/state/movie/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const movie = useSelector(movieSelector, R.equals)
  const { movieId } = useParams()
  const [loading, setLoading] = useState(true)
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

  const onFinish = () => setLoading(false)

  useEffect(() => {
    dispatch(fetchMovie(movieId, onFinish))
  }, [movieId])

  return {
    movie,
    loading,
    handleFavoriteClick,
    handleWatchlistClick,
    popoverOpen,
    setPopoverOpen,
    onFinish
  }
}

export default useContainer
