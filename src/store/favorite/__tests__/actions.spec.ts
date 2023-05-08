import httpClient from 'src/lib/api/httpClient'
import { getFavorite } from 'src/lib/apiRoutes'
import { fetchFavorite } from '../actions'

jest.mock('src/store/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id'),
  accountSelector: jest.fn(() => ({ id: 123 }))
}))

describe('fetchFavorite', () => {
  const action = fetchFavorite(1)
  const dispatch = jest.fn()
  const getState = jest.fn()
  const requestSpy = jest.spyOn(httpClient, 'request')

  const request = {
    url: getFavorite(123),
    params: { session_id: 'session_id', page: 1 }
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