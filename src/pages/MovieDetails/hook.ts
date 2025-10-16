import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchLists } from 'src/store/createdLists/actions'
import { createdListsSelector } from 'src/store/createdLists/selectors'
import { showNotification } from 'src/store/features/app'
import { selectAccount, selectSessionId } from 'src/store/features/auth'
import { useAddToFavoriteMutation } from 'src/store/features/favorite'
import { useGetMovieDetailsQuery } from 'src/store/features/movieDetails'
import { useAddToWatchlistMutation } from 'src/store/features/watchlist'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import errorMessage from 'src/utils/helpers/errorMessage'
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
  const account = useAppSelector(selectAccount)
  const sessionId = useAppSelector(selectSessionId)
  const lists = useAppSelector(createdListsSelector)
  const movieId = getIdFromSlug(movieSlug)
  const [popoverOpen, setPopoverOpen] = useState(false)

  const { data: movie, error, isLoading } = useGetMovieDetailsQuery(movieId)
  const [addToFavorite] = useAddToFavoriteMutation()
  const [addToWatchlist] = useAddToWatchlistMutation()

  const handlePopoverMouseEnter = () => {
    if (account && !lists) {
      dispatch(fetchLists('1'))
    }
  }

  const handleFavoriteClick = () => {
    const inFavorite = !movie!.account_states.favorite

    addToFavorite({ inFavorite, movieId })
    dispatch(
      showNotification({
        message: favoriteMessage(movie!.title, inFavorite),
      })
    )
  }

  const handleWatchlistClick = () => {
    const inWatchlist = !movie?.account_states.watchlist

    addToWatchlist({ inWatchlist, movieId })
    dispatch(
      showNotification({
        message: watchlistMessage(movie!.title, inWatchlist),
      })
    )
  }

  const handleGoToCast = () => {
    navigate('cast')
  }

  return {
    error: errorMessage(error),
    handleFavoriteClick,
    handleGoToCast,
    handlePopoverMouseEnter,
    handleWatchlistClick,
    isLoading,
    movie,
    popoverOpen,
    sessionId,
    setPopoverOpen,
  }
}

export default useContainer
