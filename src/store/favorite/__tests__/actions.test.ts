import { mockMoviesResponse } from 'src/__mocks__/mockMovie'
import { dispatch, getState } from 'src/__mocks__/react-redux'
import * as apiRoutes from 'src/api/apiRoutes'

import { fetchFavorite } from '../actions'

const accountId = 1234
jest.mock('src/store/auth/selectors', () => ({
  accountSelector: () => ({ id: accountId }),
}))

const sessionId = 'test/session_id'
jest.mock('src/utils/helpers/getSessionId', () => {
  return jest.fn(() => sessionId)
})

describe('fetchFavorite', () => {
  const getFavorite = jest.spyOn(apiRoutes, 'getFavorite')
  const errorMessage = 'Something went wrong!'
  const page = '1'

  const thunk = fetchFavorite(page)

  it('should handle success', async () => {
    getFavorite.mockResolvedValueOnce(mockMoviesResponse)

    const result = await thunk(dispatch, getState, undefined)
    const { calls } = dispatch.mock

    expect(getFavorite).toHaveBeenCalledWith({ accountId, page, sessionId })
    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toBe(fetchFavorite.pending.type)
    expect(calls[1][0].type).toBe(fetchFavorite.fulfilled.type)
    expect(result.payload).toEqual(mockMoviesResponse)
  })

  it('should handle failure', async () => {
    getFavorite.mockRejectedValueOnce(errorMessage)

    const result = await thunk(dispatch, getState, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toBe(fetchFavorite.pending.type)
    expect(calls[1][0].type).toBe(fetchFavorite.rejected.type)
    expect(result.payload).toBe(errorMessage)
  })
})
