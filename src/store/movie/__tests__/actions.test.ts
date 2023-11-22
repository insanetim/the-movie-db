import { dispatch, getState } from 'src/__mocks__/react-redux'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import httpClient from 'src/libs/api/httpClient'
import * as routes from 'src/libs/apiRoutes'
import { showNotification } from 'src/store/app/actions'

import {
  changeMovieInFavorite,
  changeMovieInWatchlist,
  fetchMovieDetail
} from '../actions'

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => 'test/id'
}))

jest.mock('src/store/session/selectors', () => ({
  accountSelector: () => ({ id: 123 }),
  sessionIdSelector: () => 'session_id'
}))

describe('movie actions', () => {
  const requestSpy = jest.spyOn(httpClient, 'request')
  const errorNotification = showNotification({
    messageText: 'Something went wrong!',
    messageType: NOTIFICATION_TYPE.ERROR
  })

  describe('fetchMovie', () => {
    const thunk = fetchMovieDetail('123')

    const movieDetailRequest = { url: routes.getMovieDetails('123') }
    const movieDetailResponse = { data: { id: 123, title: 'test/movie' } }
    const imagesRequest = { url: routes.getMovieImages('123') }
    const imagesResponse = { data: { backdrops: ['1', '2', '3'] } }
    const accountStatesRequest = {
      params: { session_id: 'session_id' },
      url: routes.getMovieAccountStates('123')
    }
    const accountStatesResponse = {
      data: { favorite: false, watchlist: false }
    }
    const creditsRequest = { url: routes.getMovieCredits('123') }
    const creditsResponse = { data: { cast: [], crew: [] } }
    const extentedData = {
      ...movieDetailResponse.data,
      accountStates: accountStatesResponse.data,
      credits: creditsResponse.data,
      images: imagesResponse.data.backdrops.slice(0, 7)
    }

    it('should handle success', async () => {
      requestSpy
        .mockResolvedValueOnce(movieDetailResponse)
        .mockResolvedValueOnce(imagesResponse)
        .mockResolvedValueOnce(accountStatesResponse)
        .mockResolvedValueOnce(creditsResponse)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(requestSpy).toHaveBeenCalledTimes(4)
      expect(requestSpy).toHaveBeenNthCalledWith(1, movieDetailRequest)
      expect(requestSpy).toHaveBeenNthCalledWith(2, imagesRequest)
      expect(requestSpy).toHaveBeenNthCalledWith(3, accountStatesRequest)
      expect(requestSpy).toHaveBeenNthCalledWith(4, creditsRequest)
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchMovieDetail.pending.type)
      expect(calls[1][0].type).toBe(fetchMovieDetail.fulfilled.type)
      expect(result.payload).toEqual(extentedData)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchMovieDetail.pending.type)
      expect(calls[1][0].type).toBe(fetchMovieDetail.rejected.type)
      expect(result.payload).toBe('Something went wrong!')
    })
  })

  describe('changeMovieInFavorite', () => {
    const props = { inFavorite: true, movieId: 123 }
    const thunk = changeMovieInFavorite(props)

    const request = {
      data: {
        favorite: props.inFavorite,
        media_id: props.movieId,
        media_type: 'movie'
      },
      method: 'post',
      params: { session_id: 'session_id' },
      url: routes.addToFovorite(123)
    }
    const response = { data: { success: true } }

    it('should handle success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(changeMovieInFavorite.pending.type)
      expect(calls[1][0].type).toBe(changeMovieInFavorite.fulfilled.type)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(3)
      expect(calls[0][0].type).toBe(changeMovieInFavorite.pending.type)
      expect(calls[1][0].type).toBe(showNotification.type)
      expect(calls[2][0].type).toBe(changeMovieInFavorite.fulfilled.type)
      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })
  })

  describe('changeMovieInWatchlist', () => {
    const props = { inWatchlist: true, movieId: 123 }
    const thunk = changeMovieInWatchlist(props)

    const request = {
      data: {
        media_id: props.movieId,
        media_type: 'movie',
        watchlist: props.inWatchlist
      },
      method: 'post',
      params: { session_id: 'session_id' },
      url: routes.addToWatchlist(123)
    }
    const response = { data: { success: true } }

    it('should handle success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(changeMovieInWatchlist.pending.type)
      expect(calls[1][0].type).toBe(changeMovieInWatchlist.fulfilled.type)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(3)
      expect(calls[0][0].type).toBe(changeMovieInWatchlist.pending.type)
      expect(calls[1][0].type).toBe(showNotification.type)
      expect(calls[2][0].type).toBe(changeMovieInWatchlist.fulfilled.type)
      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })
  })
})
