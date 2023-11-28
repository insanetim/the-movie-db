import { createAsyncThunk } from '@reduxjs/toolkit'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import { IMovie, IMovieDetailExtended } from 'src/interfaces/movie.interface'
import {
  addToFovorite,
  addToWatchlist,
  getMovieAccountStates,
  getMovieCredits,
  getMovieDetails,
  getMovieImages
} from 'src/libs/apiRoutes'
import { accountSelector, sessionIdSelector } from 'src/store/session/selectors'
import errorMessage from 'src/utils/helpers/errorMessage'

import { showNotification } from '../app/actions'
import { RootState } from '../index'
import * as types from './constants'
import {
  ChangeMovieInFavoriteProps,
  ChangeMovieInWatchlistProps
} from './types'

const fetchMovieDetail = createAsyncThunk<
  IMovieDetailExtended,
  IMovie['id'],
  { rejectValue: string; state: RootState }
>(
  types.fetchMovieDetail,
  async function (movieId, { getState, rejectWithValue }) {
    const sessionId = sessionIdSelector(getState())

    try {
      const [movieDetail, images, accountStates, credits] = await Promise.all([
        getMovieDetails({ movieId }),
        getMovieImages({ movieId }),
        getMovieAccountStates({ movieId, sessionId }),
        getMovieCredits({ movieId })
      ])

      const movieDetailExtended: IMovieDetailExtended = {
        ...movieDetail,
        accountStates,
        credits,
        images
      }

      return movieDetailExtended
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

const changeMovieInFavorite = createAsyncThunk<
  void,
  ChangeMovieInFavoriteProps,
  { state: RootState }
>(
  types.changeMovieInFavorite,
  async function ({ inFavorite, movieId }, { dispatch, getState }) {
    const sessionId = sessionIdSelector(getState())
    const accountId = accountSelector(getState())!.id

    try {
      await addToFovorite({ accountId, inFavorite, movieId, sessionId })
    } catch (error) {
      dispatch(
        showNotification({
          messageText: errorMessage(error),
          messageType: NOTIFICATION_TYPE.ERROR
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
    const sessionId = sessionIdSelector(getState())
    const accountId = accountSelector(getState())!.id

    try {
      await addToWatchlist({ accountId, inWatchlist, movieId, sessionId })
    } catch (error) {
      dispatch(
        showNotification({
          messageText: errorMessage(error),
          messageType: NOTIFICATION_TYPE.ERROR
        })
      )
    }
  }
)

export { changeMovieInFavorite, changeMovieInWatchlist, fetchMovieDetail }
