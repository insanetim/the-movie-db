import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { isEqual } from 'lodash'

import { changeMovieInFavorites, changeMovieInWatchlist, requestMovie } from 'src/state/movie/actions'
import { movieInFavoritesSelector, movieInWatchlistSelector, movieSelector } from 'src/state/movie/selectors'

export const useContainer = () => {
  const dispatch = useDispatch()
  const movie = useSelector(movieSelector, isEqual)
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
    dispatch(requestMovie(movieId, () => setLoading(false)))
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
