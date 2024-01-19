import { isNil } from 'ramda'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'src/hooks/useRedux'
import useRequest from 'src/hooks/useRequest'
import { RootState } from 'src/store'
import { showNotification } from 'src/store/app/actions'
import { fetchLists } from 'src/store/createdLists/actions'
import {
  changeMovieInFavorite,
  changeMovieInWatchlist,
  fetchMovieDetail,
} from 'src/store/movie/actions'
import { selectMovieById } from 'src/store/movie/selectors'
import favoriteMessage from 'src/utils/helpers/favoriteMessage'
import watchlistMessage from 'src/utils/helpers/watchlistMessage'

import { MovieDetailHookReturn, MovieDetailRouteParams } from './types'

const useContainer = (): MovieDetailHookReturn => {
  const { movieId } = useParams<
    keyof MovieDetailRouteParams
  >() as MovieDetailRouteParams
  const dispatch = useAppDispatch()
  const movie = useSelector((state: RootState) =>
    selectMovieById(state, movieId)
  )
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
