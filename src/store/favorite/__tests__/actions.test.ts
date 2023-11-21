import { dispatch, getState } from 'src/__mocks__/react-redux'
import httpClient from 'src/lib/api/httpClient'
import { getFavorite } from 'src/lib/apiRoutes'

import { fetchFavorite } from '../actions'

jest.mock('src/store/session/selectors', () => ({
  accountSelector: () => ({ id: 123 }),
  sessionIdSelector: () => 'session_id'
}))

describe('fetchFavorite', () => {
  const requestSpy = jest.spyOn(httpClient, 'request')

  const thunk = fetchFavorite('1')

  const request = {
    params: { page: '1', session_id: 'session_id' },
    url: getFavorite(123)
  }
  const response = { data: 'test/data' }

  it('should handle success', async () => {
    requestSpy.mockResolvedValueOnce(response)

    const result = await thunk(dispatch, getState, undefined)
    const { calls } = dispatch.mock

    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(requestSpy).toHaveBeenCalledWith(request)
    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toBe(fetchFavorite.pending.type)
    expect(calls[1][0].type).toBe(fetchFavorite.fulfilled.type)
    expect(result.payload).toEqual(response.data)
  })

  it('should handle failure', async () => {
    requestSpy.mockRejectedValueOnce('Something went wrong!')

    const result = await thunk(dispatch, getState, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toBe(fetchFavorite.pending.type)
    expect(calls[1][0].type).toBe(fetchFavorite.rejected.type)
    expect(result.payload).toBe('Something went wrong!')
  })
})
