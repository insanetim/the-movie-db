import { mockMoviesResponse } from 'src/__mocks__/mockMovie'
import { dispatch, getState } from 'src/__mocks__/react-redux'
import * as apiRoutes from 'src/services/api/apiRoutes'

import { fetchSearch, fetchTrending } from '../actions'

describe('dashboard actions', () => {
  const getTrending = jest.spyOn(apiRoutes, 'getTrending')
  const searchMovies = jest.spyOn(apiRoutes, 'searchMovies')
  const errorMessage = 'Something went wrong!'
  const page = '1'
  const query = 'test/search'

  describe('fetchTrending', () => {
    const thunk = fetchTrending(page)

    it('should handle success', async () => {
      getTrending.mockResolvedValueOnce(mockMoviesResponse)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(getTrending).toHaveBeenCalledWith({ page })
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchTrending.pending.type)
      expect(calls[1][0].type).toBe(fetchTrending.fulfilled.type)
      expect(result.payload).toEqual(mockMoviesResponse)
    })

    it('should handle failure', async () => {
      getTrending.mockRejectedValueOnce(errorMessage)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchTrending.pending.type)
      expect(calls[1][0].type).toBe(fetchTrending.rejected.type)
      expect(result.payload).toBe(errorMessage)
    })
  })

  describe('fetchSearch', () => {
    const thunk = fetchSearch({ page, query })

    it('should handle success', async () => {
      searchMovies.mockResolvedValueOnce(mockMoviesResponse)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(searchMovies).toHaveBeenCalledWith({ page, query })
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchSearch.pending.type)
      expect(calls[1][0].type).toBe(fetchSearch.fulfilled.type)
      expect(result.payload).toEqual(mockMoviesResponse)
    })

    it('should handle failure', async () => {
      searchMovies.mockRejectedValueOnce(errorMessage)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchSearch.pending.type)
      expect(calls[1][0].type).toBe(fetchSearch.rejected.type)
      expect(result.payload).toBe(errorMessage)
    })
  })
})
