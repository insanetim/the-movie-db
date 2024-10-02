import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { showNotification } from 'src/store/app/actions'
import {
  accountSelector,
  isAuthenticatedSelector,
} from 'src/store/auth/selectors'
import { fetchLists } from 'src/store/createdLists/actions'
import { createdListsSelector } from 'src/store/createdLists/selectors'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
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
  const account = useAppSelector(accountSelector)
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)
  const lists = useAppSelector(createdListsSelector)
  const movieId = getIdFromSlug(movieSlug)
  const movie = useAppSelector(state => movieDetailsSelector(state, movieId))
  const loading = useAppSelector(movieDetailsLoadingSelector)
  const error = useAppSelector(movieDetailsErrorSelector)
  const [popoverOpen, setPopoverOpen] = useState(false)

  const handlePopoverMouseEnter = () => {
    if (account && !lists) {
      dispatch(fetchLists('1'))
    }
  }

  const handleFavoriteClick = () => {
    const inFavorite = !movie!.account_states.favorite

    dispatch(changeMovieInFavorite({ inFavorite, movieId }))
    dispatch(
      showNotification({
        message: favoriteMessage(movie!.title, inFavorite),
      })
    )
  }

  const handleWatchlistClick = () => {
    const inWatchlist = !movie?.account_states.watchlist

    dispatch(changeMovieInWatchlist({ inWatchlist, movieId }))
    dispatch(
      showNotification({
        message: watchlistMessage(movie!.title, inWatchlist),
      })
    )
  }

  const handleGoToCast = () => {
    navigate('cast')
  }

  useEffect(() => {
    if (!movie) {
      dispatch(fetchMovieDetails(movieId))
    }
  }, [dispatch, movie, movieId])

  return {
    error,
    handleFavoriteClick,
    handleGoToCast,
    handlePopoverMouseEnter,
    handleWatchlistClick,
    isAuthenticated,
    loading,
    movie,
    popoverOpen,
    setPopoverOpen,
  }
}

export default useContainer
