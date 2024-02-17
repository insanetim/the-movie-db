import { isNil } from 'ramda'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from 'src/hooks/useRedux'
import { RootState } from 'src/store'
import { showNotification } from 'src/store/app/actions'
import { fetchLists } from 'src/store/createdLists/actions'
import {
  changeMovieInFavorite,
  changeMovieInWatchlist,
  fetchMovieDetails,
} from 'src/store/movieDetails/actions'
import {
  movieDetailsErrorSelector,
  movieDetailsLoadingSelector,
  movieDetailsSelector,
} from 'src/store/movieDetails/selectors'
import favoriteMessage from 'src/utils/helpers/favoriteMessage'
import getIdFromSlug from 'src/utils/helpers/getIdFromSlug'
import watchlistMessage from 'src/utils/helpers/watchlistMessage'

import { MovieDetailsHookReturn, MovieDetailsRouteParams } from './types'

const useContainer = (): MovieDetailsHookReturn => {
  const { movieSlug } = useParams<
    keyof MovieDetailsRouteParams
  >() as MovieDetailsRouteParams
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const movieId = getIdFromSlug(movieSlug)
  const movie = useSelector((state: RootState) =>
    movieDetailsSelector(state, movieId)
  )
  const loading = useSelector(movieDetailsLoadingSelector)
  const error = useSelector(movieDetailsErrorSelector)
  const [popoverOpen, setPopoverOpen] = useState(false)

  const handleFavoriteClick = () => {
    const inFavorite = !movie!.account_states.favorite

    dispatch(changeMovieInFavorite({ inFavorite, movieId }))
    dispatch(
      showNotification({
        messageText: favoriteMessage(movie!.title, inFavorite),
      })
    )
  }

  const handleWatchlistClick = () => {
    const inWatchlist = !movie?.account_states.watchlist

    dispatch(changeMovieInWatchlist({ inWatchlist, movieId }))
    dispatch(
      showNotification({
        messageText: watchlistMessage(movie!.title, inWatchlist),
      })
    )
  }

  const handleGoToCast = () => {
    navigate('cast')
  }

  useEffect(() => {
    if (isNil(movie)) {
      dispatch(fetchMovieDetails(movieId))
    }
    dispatch(fetchLists('1'))
  }, [dispatch, movie, movieId])

  return {
    error,
    handleFavoriteClick,
    handleGoToCast,
    handleWatchlistClick,
    loading,
    movie,
    popoverOpen,
    setPopoverOpen,
  }
}

export default useContainer
