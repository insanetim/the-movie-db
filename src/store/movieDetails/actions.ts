import { getImdbInfo } from 'src/api/imdb/apiRoutes'
import {
  addToFovorite,
  addToWatchlist,
  getMovieDetails,
} from 'src/api/tmdb/apiRoutes'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import { IMovie } from 'src/interfaces/movie.interface'
import { accountSelector } from 'src/store/auth/selectors'
import errorMessage from 'src/utils/helpers/errorMessage'
import getSessionId from 'src/utils/helpers/getSessionId'

import { showNotification } from '../app/actions'
import { createAppAsyncThunk } from '../withTypes'
import * as types from './constants'
import {
  ChangeMovieInFavoriteProps,
  ChangeMovieInWatchlistProps,
} from './types'

const fetchMovieDetails = createAppAsyncThunk(
  types.fetchMovieDetails,
  async function (movieId: IMovie['id'], { rejectWithValue }) {
    const sessionId = getSessionId()

    try {
      let movieDetails = await getMovieDetails({ movieId, sessionId })
      if (movieDetails.imdb_id) {
        const imdbInfo = await getImdbInfo({ imdbId: movieDetails.imdb_id })
        movieDetails = { ...movieDetails, imdbInfo }
      }

      return movieDetails
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

const changeMovieInFavorite = createAppAsyncThunk(
  types.changeMovieInFavorite,
  async function (
    { inFavorite, movieId }: ChangeMovieInFavoriteProps,
    { dispatch, getState }
  ) {
    const sessionId = getSessionId()
    const { id: accountId } = accountSelector(getState())!

    try {
      await addToFovorite({ accountId, inFavorite, movieId, sessionId })
    } catch (error) {
      dispatch(
        showNotification({
          message: errorMessage(error),
          type: NOTIFICATION_TYPE.ERROR,
        })
      )
    }
  }
)

const changeMovieInWatchlist = createAppAsyncThunk(
  types.changeMovieInWatchlist,
  async function (
    { inWatchlist, movieId }: ChangeMovieInWatchlistProps,
    { dispatch, getState }
  ) {
    const sessionId = getSessionId()
    const { id: accountId } = accountSelector(getState())!

    try {
      await addToWatchlist({ accountId, inWatchlist, movieId, sessionId })
    } catch (error) {
      dispatch(
        showNotification({
          message: errorMessage(error),
          type: NOTIFICATION_TYPE.ERROR,
        })
      )
    }
  }
)

export { changeMovieInFavorite, changeMovieInWatchlist, fetchMovieDetails }
