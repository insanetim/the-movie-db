import { dispatch, getState } from 'src/__mocks__/react-redux'
import httpClient from 'src/lib/api/httpClient'
import { getFavorite } from 'src/lib/apiRoutes'

import { fetchFavorite } from '../actions'

jest.mock('src/store/session/selectors', () => ({
  accountSelector: jest.fn(() => ({ id: 123 })),
  sessionIdSelector: jest.fn(() => 'session_id')
}))

describe('fetchFavorite', () => {
  const action = fetchFavorite('1')
  const requestSpy = jest.spyOn(httpClient, 'request')

  const request = {
    params: { page: '1', session_id: 'session_id' },
    url: getFavorite(123)
  }
  const response = { data: 'test/data' }

  it('should handle success', async () => {
    requestSpy.mockResolvedValueOnce(response)

    const result = await action(dispatch, getState, undefined)

    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(requestSpy).toHaveBeenCalledWith(request)
    expect(result.payload).toEqual(response.data)
  })

  it('should handle failure', async () => {
    requestSpy.mockRejectedValueOnce('Something went wrong!')

    const result = await action(dispatch, getState, undefined)

    expect(result.payload).toBe('Something went wrong!')
  })
})
