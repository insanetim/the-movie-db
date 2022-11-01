import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as R from 'ramda'

import { changeMovieInFavorites, changeMovieInWatchlist, fetchMovie } from 'src/state/movie/actions'
import { movieInFavoritesSelector, movieInWatchlistSelector, movieSelector } from 'src/state/movie/selectors'

export const useContainer = () => {
  const dispatch = useDispatch()
  const movie = useSelector(movieSelector, R.equals)
  const movieInFavorites = useSelector(movieInFavoritesSelector)
  const movieInWatchlist = useSelector(movieInWatchlistSelector)
  const { movieId } = useParams()
  const [loading, setLoading] = useState(true)
  const [popoverOpen, setPopoverOpen] = useState(false)

  const handleFavoriteClick = () => {
    dispatch(
      changeMovieInFavorites({
        movieId,
        inFavorite: !movieInFavorites
      })
    )
  }

  const handleWatchlistClick = () => {
    dispatch(
      changeMovieInWatchlist({
        movieId,
        inWatchlist: !movieInWatchlist
      })
    )
  }

  useEffect(() => {
    dispatch(fetchMovie(movieId, () => setLoading(false)))
  }, [movieId])

  return {
    movie,
    movieInFavorites,
    movieInWatchlist,
    loading,
    handleFavoriteClick,
    handleWatchlistClick,
    popoverOpen,
    setPopoverOpen
  }
}
