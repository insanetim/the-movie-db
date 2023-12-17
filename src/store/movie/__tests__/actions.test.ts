import {
  mockMovieDetail,
  mockMovieDetailExtended,
} from 'src/__mocks__/mockMovie'
import { dispatch, getState } from 'src/__mocks__/react-redux'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import * as apiRoutes from 'src/services/api/apiRoutes'
import { showNotification } from 'src/store/app/actions'

import {
  changeMovieInFavorite,
  changeMovieInWatchlist,
  fetchMovieDetail,
} from '../actions'

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => 'test/id',
}))

const accountId = 1234
const sessionId = 'test/session_id'
jest.mock('src/store/session/selectors', () => ({
  accountSelector: () => ({ id: accountId }),
  sessionIdSelector: () => sessionId,
}))

describe('movie actions', () => {
  const addToFovorite = jest.spyOn(apiRoutes, 'addToFovorite')
  const addToWatchlist = jest.spyOn(apiRoutes, 'addToWatchlist')
  const getMovieAccountStates = jest.spyOn(apiRoutes, 'getMovieAccountStates')
  const getMovieCredits = jest.spyOn(apiRoutes, 'getMovieCredits')
  const getMovieDetails = jest.spyOn(apiRoutes, 'getMovieDetails')
  const getMovieImages = jest.spyOn(apiRoutes, 'getMovieImages')
  const errorMessage = 'Something went wrong!'
  const errorNotification = showNotification({
    messageText: errorMessage,
    messageType: NOTIFICATION_TYPE.ERROR,
  })
  const movieId = 1234
  const inFavorite = true
  const inWatchlist = true

  describe('fetchMovie', () => {
    const thunk = fetchMovieDetail(movieId)

    it('should handle success', async () => {
      getMovieDetails.mockResolvedValueOnce(mockMovieDetail)
      getMovieImages.mockResolvedValueOnce(mockMovieDetailExtended.images)
      getMovieAccountStates.mockResolvedValueOnce(
        mockMovieDetailExtended.accountStates
      )
      getMovieCredits.mockResolvedValueOnce(mockMovieDetailExtended.credits)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(getMovieDetails).toHaveBeenCalledWith({ movieId })
      expect(getMovieImages).toHaveBeenCalledWith({ movieId })
      expect(getMovieAccountStates).toHaveBeenCalledWith({ movieId, sessionId })
      expect(getMovieCredits).toHaveBeenCalledWith({ movieId })
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchMovieDetail.pending.type)
      expect(calls[1][0].type).toBe(fetchMovieDetail.fulfilled.type)
      expect(result.payload).toEqual(mockMovieDetailExtended)
    })

    it('should handle failure', async () => {
      getMovieDetails.mockRejectedValueOnce(errorMessage)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchMovieDetail.pending.type)
      expect(calls[1][0].type).toBe(fetchMovieDetail.rejected.type)
      expect(result.payload).toBe(errorMessage)
    })
  })

  describe('changeMovieInFavorite', () => {
    const thunk = changeMovieInFavorite({ inFavorite, movieId })

    it('should handle success', async () => {
      addToFovorite.mockResolvedValueOnce()

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(addToFovorite).toHaveBeenCalledWith({
        accountId,
        inFavorite,
        movieId,
        sessionId,
      })
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(changeMovieInFavorite.pending.type)
      expect(calls[1][0].type).toBe(changeMovieInFavorite.fulfilled.type)
    })

    it('should handle failure', async () => {
      addToFovorite.mockRejectedValueOnce(errorMessage)

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
    const thunk = changeMovieInWatchlist({ inWatchlist, movieId })

    it('should handle success', async () => {
      addToWatchlist.mockResolvedValueOnce()

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(addToWatchlist).toHaveBeenCalledWith({
        accountId,
        inWatchlist,
        movieId,
        sessionId,
      })
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(changeMovieInWatchlist.pending.type)
      expect(calls[1][0].type).toBe(changeMovieInWatchlist.fulfilled.type)
    })

    it('should handle failure', async () => {
      addToWatchlist.mockRejectedValueOnce(errorMessage)

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
