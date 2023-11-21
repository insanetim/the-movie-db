import { dispatch, getState } from 'src/__mocks__/react-redux'
import httpClient from 'src/lib/api/httpClient'
import { getTrending, searchMovies } from 'src/lib/apiRoutes'

import { fetchSearch, fetchTrending } from '../actions'

describe('dashboard actions', () => {
  const requestSpy = jest.spyOn(httpClient, 'request')

  describe('fetchTrending', () => {
    const thunk = fetchTrending('1')

    const request = { params: { page: '1' }, url: getTrending }
    const response = { data: 'test/data' }

    it('should handle success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchTrending.pending.type)
      expect(calls[1][0].type).toBe(fetchTrending.fulfilled.type)
      expect(result.payload).toEqual(response.data)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchTrending.pending.type)
      expect(calls[1][0].type).toBe(fetchTrending.rejected.type)
      expect(result.payload).toBe('Something went wrong!')
    })
  })

  describe('fetchSearch', () => {
    const thunk = fetchSearch({ page: '1', query: 'test/query' })

    const request = {
      params: { page: '1', query: 'test/query' },
      url: searchMovies
    }
    const response = { data: 'test/data' }

    it('should handle success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchSearch.pending.type)
      expect(calls[1][0].type).toBe(fetchSearch.fulfilled.type)
      expect(result.payload).toEqual(response.data)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchSearch.pending.type)
      expect(calls[1][0].type).toBe(fetchSearch.rejected.type)
      expect(result.payload).toBe('Something went wrong!')
    })
  })
})
