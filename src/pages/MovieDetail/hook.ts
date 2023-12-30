import { isNil } from 'ramda'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import useRequest from 'src/hooks/useRequest'
import { showNotification } from 'src/store/app/actions'
import { fetchLists } from 'src/store/lists/actions'
import {
  changeMovieInFavorite,
  changeMovieInWatchlist,
  fetchMovieDetail,
} from 'src/store/movie/actions'
import { selectMovieById } from 'src/store/movie/selectors'
import favoriteMessage from 'src/utils/helpers/favoriteMessage'
import watchlistMessage from 'src/utils/helpers/watchlistMessage'

import { MovieDetailHook, MovieDetailRouteParams } from './types'

const useContainer = (): MovieDetailHook => {
  const { movieId } = useParams<
    keyof MovieDetailRouteParams
  >() as MovieDetailRouteParams
  const dispatch = useAppDispatch()
  const movie = useAppSelector(state => selectMovieById(state, movieId))
  const [popoverOpen, setPopoverOpen] = useState(false)
  const { error, loading, request } = useRequest(isNil(movie))

  const handleFavoriteClick = () => {
    const inFavorite = !movie!.accountStates.favorite

    dispatch(changeMovieInFavorite({ inFavorite, movieId }))
    dispatch(
      showNotification({
        messageText: favoriteMessage(movie!.title, inFavorite),
      })
    )
  }

  const handleWatchlistClick = () => {
    const inWatchlist = !movie?.accountStates.watchlist

    dispatch(changeMovieInWatchlist({ inWatchlist, movieId }))
    dispatch(
      showNotification({
        messageText: watchlistMessage(movie!.title, inWatchlist),
      })
    )
  }

  useEffect(() => {
    if (isNil(movie)) {
      request(fetchMovieDetail(movieId))
    }
    dispatch(fetchLists('1'))
  }, [dispatch, movieId, movie, request])

  return {
    error,
    handleFavoriteClick,
    handleWatchlistClick,
    loading,
    movie,
    popoverOpen,
    setPopoverOpen,
  }
}

export default useContainer
