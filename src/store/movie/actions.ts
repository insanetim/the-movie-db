import type { IAccount } from 'src/interfaces/account.interface'
import type {
  IMovieAccountStates,
  IMovieCredits,
  IMovieDetail,
  IMovieDetailExtended,
  IMovieImages
} from 'src/interfaces/movie.interface'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { pathOr } from 'ramda'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import httpClient from 'src/lib/api/httpClient'
import * as routes from 'src/lib/apiRoutes'
import { accountSelector, sessionIdSelector } from 'src/store/session/selectors'

import type { RootState } from '../index'
import type { ChangeMovieInFavoriteProps, ChangeMovieInWatchlistProps, MovieId } from './types'

import { showNotification } from '../app/actions'
import { fetchFavorite } from '../favorite/actions'
import { fetchLists } from '../lists/actions'
import { fetchWatchlist } from '../watchlist/actions'
import { CHANGE_MOVIE_IN_FAVORITE, CHANGE_MOVIE_IN_WATCHLIST, FETCH_MOVIE } from './constants'

export const fetchMovie = createAsyncThunk(
  FETCH_MOVIE,
  async (movieId: MovieId, { dispatch, getState, rejectWithValue }) => {
    const sessionId = sessionIdSelector(getState() as RootState)

    try {
      const { data } = await httpClient.request<IMovieDetail>({ url: routes.getMovieDetails(movieId.toString()) })
      const { data: images } = await httpClient.request<IMovieImages>({
        url: routes.getMovieImages(movieId.toString())
      })
      const { data: accountStates } = await httpClient.request<IMovieAccountStates>({
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

      await dispatch(fetchLists('1'))

      return extendedData
    } catch (error) {
      const message = pathOr('Something went wrong!', ['response', 'data', 'status_message'], error)

      return rejectWithValue(message)
    }
  }
)

export const changeMovieInFavorite = createAsyncThunk(
  CHANGE_MOVIE_IN_FAVORITE,
  async ({ inFavorite, movieId }: ChangeMovieInFavoriteProps, { dispatch, getState }) => {
    const sessionId = sessionIdSelector(getState() as RootState)
    const { id: accountId } = accountSelector(getState() as RootState) as IAccount

    try {
      await httpClient.request({
        data: { favorite: inFavorite, media_id: movieId, media_type: 'movie' },
        method: 'post',
        params: { session_id: sessionId },
        url: routes.addToFovorite(accountId)
      })

      const {
        data: { title: movieTitle }
      } = await httpClient.request<IMovieDetail>({ url: routes.getMovieDetails(movieId.toString()) })

      const messageText = `${movieTitle} ${inFavorite ? 'added to Favorite' : 'removed from Favorite'}`

      dispatch(showNotification({ messageText }))
      dispatch(fetchFavorite('1'))
    } catch (error) {
      const messageText = pathOr('Something went wrong!', ['response', 'data', 'status_message'], error)

      dispatch(
        showNotification({
          messageText,
          messageType: NOTIFICATION_TYPE.ERROR
        })
      )
    }
  }
)

export const changeMovieInWatchlist = createAsyncThunk(
  CHANGE_MOVIE_IN_WATCHLIST,
  async ({ inWatchlist, movieId }: ChangeMovieInWatchlistProps, { dispatch, getState }) => {
    const sessionId = sessionIdSelector(getState() as RootState)
    const { id: accountId } = accountSelector(getState() as RootState) as IAccount

    try {
      await httpClient.request({
        data: { media_id: movieId, media_type: 'movie', watchlist: inWatchlist },
        method: 'post',
        params: { session_id: sessionId },
        url: routes.addToWatchlist(accountId)
      })

      const {
        data: { title: movieTitle }
      } = await httpClient.request<IMovieDetail>({ url: routes.getMovieDetails(movieId.toString()) })

      const messageText = `${movieTitle} ${inWatchlist ? 'added to Watchlist' : 'removed from Watchlist'}`

      dispatch(showNotification({ messageText }))
      dispatch(fetchWatchlist('1'))
    } catch (error) {
      const messageText = pathOr('Something went wrong!', ['response', 'data', 'status_message'], error)

      dispatch(
        showNotification({
          messageText,
          messageType: NOTIFICATION_TYPE.ERROR
        })
      )
    }
  }
)
