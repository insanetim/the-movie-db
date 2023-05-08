import { createAsyncThunk } from '@reduxjs/toolkit'
import { pathOr } from 'ramda'

import { NOTIFICATION_TYPE } from 'src/constants/app'
import httpClient from 'src/lib/api/httpClient'
import * as routes from 'src/lib/apiRoutes'
import type { IAccount } from 'src/interfaces/account.interface'
import type {
  IMovieAccountStates,
  IMovieCredits,
  IMovieDetail,
  IMovieDetailExtended,
  IMovieImages
} from 'src/interfaces/movie.interface'
import type { RootState } from '../index'
import type { ChangeMovieInFavoriteProps, ChangeMovieInWatchlistProps, MovieId } from './types'
import { accountSelector, sessionIdSelector } from 'src/store/session/selectors'
import { movieSelector } from './selectors'
import { showNotification } from '../app/actions'
import { fetchLists } from '../lists/actions'
import { fetchFavorite } from '../favorite/actions'
import { fetchWatchlist } from '../watchlist/actions'
import { CHANGE_MOVIE_IN_FAVORITE, CHANGE_MOVIE_IN_WATCHLIST, FETCH_MOVIE } from './constants'

export const fetchMovie = createAsyncThunk(
  FETCH_MOVIE,
  async (movieId: MovieId, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    const sessionId = sessionIdSelector(getState() as RootState)

    try {
      const { data } = await httpClient.request<IMovieDetail>({ url: routes.getMovieDetails(movieId.toString()) })
      const { data: images } = await httpClient.request<IMovieImages>({
        url: routes.getMovieImages(movieId.toString())
      })
      const { data: accountStates } = await httpClient.request<IMovieAccountStates>({
        url: routes.getMovieAccountStates(movieId.toString()),
        params: { session_id: sessionId }
      })
      const { data: credits } = await httpClient.request<IMovieCredits>({
        url: routes.getMovieCredits(movieId.toString())
      })

      const extendedData: IMovieDetailExtended = {
        ...data,
        images: images.backdrops.slice(0, 7),
        accountStates,
        credits
      }

      await dispatch(fetchLists(1))

      return fulfillWithValue(extendedData)
    } catch (error) {
      const message = pathOr('Something went wrong!', ['message'], error)

      return rejectWithValue(message)
    }
  }
)

export const changeMovieInFavorite = createAsyncThunk(
  CHANGE_MOVIE_IN_FAVORITE,
  async ({ movieId, inFavorite }: ChangeMovieInFavoriteProps, { dispatch, getState }) => {
    const sessionId = sessionIdSelector(getState() as RootState)
    const { id: accountId } = accountSelector(getState() as RootState) as IAccount
    const movie = movieSelector(getState() as RootState)
    let movieTitle = movie?.title

    try {
      await httpClient.request({
        url: routes.addToFovorite(accountId),
        method: 'post',
        params: { session_id: sessionId },
        data: { media_type: 'movie', media_id: movieId, favorite: inFavorite }
      })

      if (!movieTitle) {
        const { data } = await httpClient.request<IMovieDetail>({ url: routes.getMovieDetails(movieId.toString()) })
        movieTitle = data.title
      }

      const messageText = inFavorite ? `${movieTitle} added to Favorite` : `${movieTitle} removed from Favorite`

      dispatch(showNotification({ messageText }))
      dispatch(fetchFavorite(1))
    } catch (error) {
      const messageText = pathOr('Something went wrong!', ['message'], error)

      dispatch(
        showNotification({
          messageType: NOTIFICATION_TYPE.ERROR,
          messageText
        })
      )
    }
  }
)

export const changeMovieInWatchlist = createAsyncThunk(
  CHANGE_MOVIE_IN_WATCHLIST,
  async ({ movieId, inWatchlist }: ChangeMovieInWatchlistProps, { dispatch, getState }) => {
    const sessionId = sessionIdSelector(getState() as RootState)
    const { id: accountId } = accountSelector(getState() as RootState) as IAccount
    const movie = movieSelector(getState() as RootState)
    let movieTitle = movie?.title

    try {
      await httpClient.request({
        url: routes.addToWatchlist(accountId),
        method: 'post',
        params: { session_id: sessionId },
        data: { media_type: 'movie', media_id: movieId, watchlist: inWatchlist }
      })

      if (!movieTitle) {
        const { data } = await httpClient.request<IMovieDetail>({ url: routes.getMovieDetails(movieId.toString()) })
        movieTitle = data.title
      }

      const messageText = inWatchlist ? `${movieTitle} added to Watchlist` : `${movieTitle} removed from Watchlist`

      dispatch(showNotification({ messageText }))
      dispatch(fetchWatchlist(1))
    } catch (error) {
      const messageText = pathOr('Something went wrong!', ['message'], error)

      dispatch(
        showNotification({
          messageType: NOTIFICATION_TYPE.ERROR,
          messageText
        })
      )
    }
  }
)
