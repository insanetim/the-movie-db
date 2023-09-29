import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import useRequest from 'src/hooks/useRequest'
import {
  changeMovieInFavorite,
  changeMovieInWatchlist,
  fetchMovie
} from 'src/store/movie/actions'
import { movieSelector } from 'src/store/movie/selectors'

import type { MovieDetailHook } from './types'

const useContainer = (): MovieDetailHook => {
  const dispatch = useAppDispatch()
  const movie = useAppSelector(movieSelector)
  const { movieId = '' } = useParams()
  const [popoverOpen, setPopoverOpen] = useState(false)
  const { error, loading, request } = useRequest()

  const handleFavoriteClick = () => {
    dispatch(
      changeMovieInFavorite({
        inFavorite: !movie?.accountStates.favorite,
        movieId
      })
    )
  }

  const handleWatchlistClick = () => {
    dispatch(
      changeMovieInWatchlist({
        inWatchlist: !movie?.accountStates.watchlist,
        movieId
      })
    )
  }

  useEffect(() => {
    request(fetchMovie(movieId))
  }, [movieId, request])

  return {
    error,
    handleFavoriteClick,
    handleWatchlistClick,
    loading,
    movie,
    popoverOpen,
    setPopoverOpen
  }
}

export default useContainer
