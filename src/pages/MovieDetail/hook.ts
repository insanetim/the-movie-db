import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { changeMovieInFavorite, changeMovieInWatchlist, fetchMovie } from 'src/store/movie/actions'
import { movieSelector, movieLoadingSelector, movieErrorSelector } from 'src/store/movie/selectors'
import type { MovieDetailHook } from './types'

const useContainer = (): MovieDetailHook => {
  const dispatch = useAppDispatch()
  const movie = useAppSelector(movieSelector)
  const loading = useAppSelector(movieLoadingSelector)
  const error = useAppSelector(movieErrorSelector)
  const { movieId = '' } = useParams()
  const [popoverOpen, setPopoverOpen] = useState(false)

  const handleFavoriteClick = () => {
    dispatch(
      changeMovieInFavorite({
        movieId,
        inFavorite: !movie?.accountStates.favorite
      })
    )
  }

  const handleWatchlistClick = () => {
    dispatch(
      changeMovieInWatchlist({
        movieId,
        inWatchlist: !movie?.accountStates.watchlist
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
