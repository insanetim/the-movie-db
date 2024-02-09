import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  addToFovorite,
  addToWatchlist,
  getMovieDetails,
} from 'src/api/apiRoutes'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import { IMovie, IMovieDetailsExtended } from 'src/interfaces/movie.interface'
import { accountSelector } from 'src/store/auth/selectors'
import errorMessage from 'src/utils/helpers/errorMessage'
import getSessionId from 'src/utils/helpers/getSessionId'

import { showNotification } from '../app/actions'
import { RootState } from '../index'
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
    const movieDetails = await getMovieDetails({ movieId, sessionId })

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
