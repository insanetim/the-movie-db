import type { IAccount } from 'src/interfaces/account.interface'
import type {
  IMovie,
  IMovieAccountStates,
  IMovieCredits,
  IMovieDetail,
  IMovieDetailExtended,
  IMovieImages
} from 'src/interfaces/movie.interface'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import httpClient from 'src/lib/api/httpClient'
import * as routes from 'src/lib/apiRoutes'
import { accountSelector, sessionIdSelector } from 'src/store/session/selectors'
import errorMessage from 'src/utils/helpers/errorMessage'

import type { RootState } from '../index'
import type {
  ChangeMovieInFavoriteProps,
  ChangeMovieInWatchlistProps
} from './types'

import { showNotification } from '../app/actions'
import * as types from './constants'

const fetchMovieDetail = createAsyncThunk(
  types.fetchMovieDetail,
  async function (movieId: IMovie['id'], { getState, rejectWithValue }) {
    const sessionId = sessionIdSelector(getState() as RootState)

    try {
      const { data } = await httpClient.request<IMovieDetail>({
        url: routes.getMovieDetails(movieId.toString())
      })
      const { data: images } = await httpClient.request<IMovieImages>({
        url: routes.getMovieImages(movieId.toString())
      })
      const { data: accountStates } =
        await httpClient.request<IMovieAccountStates>({
          params: { session_id: sessionId },
          url: routes.getMovieAccountStates(movieId.toString())
        })
      const { data: credits } = await httpClient.request<IMovieCredits>({
        url: routes.getMovieCredits(movieId.toString())
      })

      const extendedData: IMovieDetailExtended = {
        ...data,
        accountStates,
        credits,
        images: images.backdrops.slice(0, 7)
      }

      return extendedData
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

const changeMovieInFavorite = createAsyncThunk(
  types.changeMovieInFavorite,
  async function (
    { inFavorite, movieId }: ChangeMovieInFavoriteProps,
    { dispatch, getState }
  ) {
    const sessionId = sessionIdSelector(getState() as RootState)
    const { id: accountId } = accountSelector(
      getState() as RootState
    ) as IAccount

    try {
      await httpClient.request({
        data: { favorite: inFavorite, media_id: movieId, media_type: 'movie' },
        method: 'post',
        params: { session_id: sessionId },
        url: routes.addToFovorite(accountId)
      })
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

const changeMovieInWatchlist = createAsyncThunk(
  types.changeMovieInWatchlist,
  async function (
    { inWatchlist, movieId }: ChangeMovieInWatchlistProps,
    { dispatch, getState }
  ) {
    const sessionId = sessionIdSelector(getState() as RootState)
    const { id: accountId } = accountSelector(
      getState() as RootState
    ) as IAccount

    try {
      await httpClient.request({
        data: {
          media_id: movieId,
          media_type: 'movie',
          watchlist: inWatchlist
        },
        method: 'post',
        params: { session_id: sessionId },
        url: routes.addToWatchlist(accountId)
      })
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
