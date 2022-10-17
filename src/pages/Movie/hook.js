import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { isEqual } from 'lodash'

import { changeMovieInFavorite, changeMovieInWatchlist, requestMovie } from 'src/store/actions'

export const useContainer = () => {
  const { movieId } = useParams()
  const dispatch = useDispatch()
  const movie = useSelector(state => state.movie, isEqual)
  const movieInFavorite = useSelector(state => state.movieInFavorite)
  const movieInWatchlist = useSelector(state => state.movieInWatchlist)
  const [loading, setLoading] = useState(true)

  const handleFavoriteClick = () => {
    dispatch(
      changeMovieInFavorite({
        movieId,
        inFavorite: !movieInFavorite
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
    movieInFavorite,
    movieInWatchlist,
    loading,
    handleFavoriteClick,
    handleWatchlistClick
  }
}
