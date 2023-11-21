import { dispatch, getState } from 'src/__mocks__/react-redux'
import { IAccount } from 'src/interfaces/account.interface'
import httpClient from 'src/lib/api/httpClient'
import { getWatchlist } from 'src/lib/apiRoutes'
import * as sessionSelectors from 'src/store/session/selectors'

import { fetchWatchlist } from '../actions'

jest.mock('src/store/session/selectors', () => ({
  accountSelector: jest.fn(() => ({ id: 123 })),
  sessionIdSelector: jest.fn(() => 'session_id')
}))

describe('fetchWatchlist', () => {
  const requestSpy = jest.spyOn(httpClient, 'request')
  jest
    .spyOn(sessionSelectors, 'sessionIdSelector')
    .mockReturnValue('session_id')
  jest
    .spyOn(sessionSelectors, 'accountSelector')
    .mockReturnValue({ id: 123 } as IAccount)

  const thunk = fetchWatchlist('1')

  const request = {
    params: { page: '1', session_id: 'session_id' },
    url: getWatchlist(123)
  }
  const response = { data: 'test/data' }

  it('should handle success', async () => {
    requestSpy.mockResolvedValueOnce(response)

    const result = await thunk(dispatch, getState, undefined)
    const { calls } = dispatch.mock

    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(requestSpy).toHaveBeenCalledWith(request)
    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toBe(fetchWatchlist.pending.type)
    expect(calls[1][0].type).toBe(fetchWatchlist.fulfilled.type)
    expect(result.payload).toEqual(response.data)
  })

  it('should handle failure', async () => {
    requestSpy.mockRejectedValueOnce('Something went wrong!')

    const result = await thunk(dispatch, getState, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toBe(fetchWatchlist.pending.type)
    expect(calls[1][0].type).toBe(fetchWatchlist.rejected.type)
    expect(result.payload).toBe('Something went wrong!')
  })
})
