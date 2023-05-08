import { NOTIFICATION_TYPE } from 'src/constants/app'
import { mockMovieDetail } from 'src/__mocks__/mockMovie'
import httpClient from 'src/lib/api/httpClient'
import * as routes from 'src/lib/apiRoutes'
import { showNotification } from 'src/store/app/actions'
import { fetchFavorite } from 'src/store/favorite/actions'
import { fetchWatchlist } from 'src/store/watchlist/actions'
import { movieSelector } from '../selectors'
import * as actions from '../actions'

jest.mock('src/store/app/actions')

jest.mock('src/store/favorite/actions')

jest.mock('src/store/watchlist/actions')

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'nonoid')
}))

jest.mock('src/store/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id'),
  accountSelector: jest.fn(() => ({ id: 123 }))
}))

jest.mock('src/store/movie/selectors', () => ({
  movieSelector: jest.fn(() => null)
}))

describe('movie actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  const requestSpy = jest.spyOn(httpClient, 'request')
  const errorNotification = showNotification({
    messageType: NOTIFICATION_TYPE.ERROR,
    messageText: 'Something went wrong!'
  })

  describe('fetchMovie', () => {
    const action = actions.fetchMovie('123')

    const movieDetailRequest = { url: routes.getMovieDetails('123') }
    const movieDetailResponse = { data: { id: 123, title: 'test/movie' } }
    const imagesRequest = { url: routes.getMovieImages('123') }
    const imagesResponse = { data: { backdrops: ['1', '2', '3'] } }
    const accountStatesRequest = {
      url: routes.getMovieAccountStates('123'),
      params: { session_id: 'session_id' }
    }
    const accountStatesResponse = { data: { favorite: false, watchlist: false } }
    const creditsRequest = { url: routes.getMovieCredits('123') }
    const creditsResponse = { data: { cast: [], crew: [] } }
    const extentedData = {
      ...movieDetailResponse.data,
      images: imagesResponse.data.backdrops.slice(0, 7),
      accountStates: accountStatesResponse.data,
      credits: creditsResponse.data
    }

    it('success', async () => {
      requestSpy
        .mockResolvedValueOnce(movieDetailResponse)
        .mockResolvedValueOnce(imagesResponse)
        .mockResolvedValueOnce(accountStatesResponse)
        .mockResolvedValueOnce(creditsResponse)

      const result = await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(4)
      expect(requestSpy).toHaveBeenNthCalledWith(1, movieDetailRequest)
      expect(requestSpy).toHaveBeenNthCalledWith(2, imagesRequest)
      expect(requestSpy).toHaveBeenNthCalledWith(3, accountStatesRequest)
      expect(requestSpy).toHaveBeenNthCalledWith(4, creditsRequest)
      expect(result.payload).toEqual(extentedData)
    })

    it('failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      const result = await action(dispatch, getState, undefined)

      expect(result.payload).toBe('Something went wrong!')
    })
  })

  describe('changeMovieInFavorite', () => {
    const props = { movieId: 123, inFavorite: true }
    const action = actions.changeMovieInFavorite(props)

    const request = {
      url: routes.addToFovorite(123),
      method: 'post',
      params: { session_id: 'session_id' },
      data: { media_type: 'movie', media_id: props.movieId, favorite: props.inFavorite }
    }
    const response = { data: { success: true } }
    const movieDetailRequest = { url: routes.getMovieDetails('123') }
    const movieDetailResponse = { data: { id: 123, title: 'test/movie' } }

    it('success', async () => {
      const notification = showNotification({
        messageText: 'test/movie added to Favorite'
      })
      requestSpy.mockResolvedValueOnce(response).mockResolvedValueOnce(movieDetailResponse)

      await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(2)
      expect(requestSpy).toHaveBeenNthCalledWith(1, request)
      expect(requestSpy).toHaveBeenNthCalledWith(2, movieDetailRequest)
      expect(dispatch).toHaveBeenCalledWith(notification)
      expect(dispatch).toHaveBeenCalledWith(fetchFavorite(1))
    })

    it('failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await action(dispatch, getState, undefined)

      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })

    it('works with other data', async () => {
      const props = { movieId: 123, inFavorite: false }
      const action = actions.changeMovieInFavorite(props)
      jest.mocked(movieSelector).mockReturnValueOnce(mockMovieDetail)
      requestSpy.mockResolvedValueOnce(response)
      const notification = showNotification({
        messageText: 'test/movie removed from Favorite'
      })

      await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(notification)
    })
  })

  describe('changeMovieInWatchlist', () => {
    const props = { movieId: 123, inWatchlist: true }
    const action = actions.changeMovieInWatchlist(props)

    const request = {
      url: routes.addToWatchlist(123),
      method: 'post',
      params: { session_id: 'session_id' },
      data: { media_type: 'movie', media_id: props.movieId, watchlist: props.inWatchlist }
    }
    const response = { data: { success: true } }
    const movieDetailRequest = { url: routes.getMovieDetails('123') }
    const movieDetailResponse = { data: { id: 123, title: 'test/movie' } }

    it('success', async () => {
      const notification = showNotification({
        messageText: 'test/movie added to Watchlist'
      })
      requestSpy.mockResolvedValueOnce(response).mockResolvedValueOnce(movieDetailResponse)

      await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(2)
      expect(requestSpy).toHaveBeenNthCalledWith(1, request)
      expect(requestSpy).toHaveBeenNthCalledWith(2, movieDetailRequest)
      expect(dispatch).toHaveBeenCalledWith(notification)
      expect(dispatch).toHaveBeenCalledWith(fetchWatchlist(1))
    })

    it('failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await action(dispatch, getState, undefined)

      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })

    it('works with other data', async () => {
      const props = { movieId: 123, inWatchlist: false }
      const action = actions.changeMovieInWatchlist(props)
      jest.mocked(movieSelector).mockReturnValueOnce(mockMovieDetail)
      requestSpy.mockResolvedValueOnce(response)
      const notification = showNotification({
        messageText: 'test/movie removed from Watchlist'
      })

      await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(notification)
    })
  })
})
