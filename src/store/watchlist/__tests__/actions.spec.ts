import { dispatch, getState } from 'src/__mocks__/react-redux'
import httpClient from 'src/lib/api/httpClient'
import { getWatchlist } from 'src/lib/apiRoutes'

import { fetchWatchlist } from '../actions'

jest.mock('src/store/session/selectors', () => ({
  accountSelector: jest.fn(() => ({ id: 123 })),
  sessionIdSelector: jest.fn(() => 'session_id')
}))

jest.mock('src/store/watchlist/selectors', () => ({
  watchlistMoviesSelector: jest.fn(() => ({
    results: [{ id: 123 }, { id: 456 }, { id: 789 }]
  }))
}))

describe('fetchWatchlist', () => {
  const requestSpy = jest.spyOn(httpClient, 'request')
  const action = fetchWatchlist('1')

  const request = {
    params: { page: '1', session_id: 'session_id' },
    url: getWatchlist(123)
  }
  const response = { data: 'test/data' }

  it('success', async () => {
    requestSpy.mockResolvedValueOnce(response)

    const result = await action(dispatch, getState, undefined)

    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(requestSpy).toHaveBeenCalledWith(request)
    expect(result.payload).toEqual(response.data)
  })

  it('failure', async () => {
    requestSpy.mockRejectedValueOnce('Something went wrong!')

    const result = await action(dispatch, getState, undefined)

    expect(result.payload).toBe('Something went wrong!')
  })
})
