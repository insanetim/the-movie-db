import { createAsyncThunk } from '@reduxjs/toolkit'
import { isNil } from 'ramda'
import { getImdbInfo } from 'src/api/imdb/apiRoutes'
import {
  addToFovorite,
  addToWatchlist,
  getMovieDetails,
} from 'src/api/tmdb/apiRoutes'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import { IMovie, IMovieDetailsExtended } from 'src/interfaces/movie.interface'
import { RootState } from 'src/store'
import { accountSelector } from 'src/store/auth/selectors'
import errorMessage from 'src/utils/helpers/errorMessage'
import getSessionId from 'src/utils/helpers/getSessionId'

import { showNotification } from '../app/actions'
import * as types from './constants'
import {
  ChangeMovieInFavoriteProps,
  ChangeMovieInWatchlistProps,
} from './types'

const fetchMovieDetails = createAsyncThunk<
  IMovieDetailsExtended,
  IMovie['id'],
  { rejectValue: string; state: RootState }
>(types.fetchMovieDetails, async function (movieId, { rejectWithValue }) {
  const sessionId = getSessionId()

  try {
    let movieDetails = await getMovieDetails({ movieId, sessionId })
    if (!isNil(movieDetails.imdb_id)) {
      const imdbInfo = await getImdbInfo({ imdbId: movieDetails.imdb_id })
      movieDetails = { ...movieDetails, imdbInfo }
    }

    return movieDetails
  } catch (error) {
    return rejectWithValue(errorMessage(error))
  }
})

const changeMovieInFavorite = createAsyncThunk<
  void,
  ChangeMovieInFavoriteProps,
  { state: RootState }
>(
  types.changeMovieInFavorite,
  async function ({ inFavorite, movieId }, { dispatch, getState }) {
    const sessionId = getSessionId()
    const accountId = accountSelector(getState())!.id

    try {
      await addToFovorite({ accountId, inFavorite, movieId, sessionId })
    } catch (error) {
      dispatch(
        showNotification({
          messageText: errorMessage(error),
          messageType: NOTIFICATION_TYPE.ERROR,
        })
      )
    }
  }
)

const changeMovieInWatchlist = createAsyncThunk<
  void,
  ChangeMovieInWatchlistProps,
  { state: RootState }
>(
  types.changeMovieInWatchlist,
  async function ({ inWatchlist, movieId }, { dispatch, getState }) {
    const sessionId = getSessionId()
    const accountId = accountSelector(getState())!.id

    try {
      await addToWatchlist({ accountId, inWatchlist, movieId, sessionId })
    } catch (error) {
      dispatch(
        showNotification({
          messageText: errorMessage(error),
          messageType: NOTIFICATION_TYPE.ERROR,
        })
      )
    }
  }
)

export { changeMovieInFavorite, changeMovieInWatchlist, fetchMovieDetails }
