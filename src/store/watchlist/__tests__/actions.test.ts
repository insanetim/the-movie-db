import { mockMoviesResponse } from 'src/__mocks__/mockMovie'
import { dispatch, getState } from 'src/__mocks__/react-redux'
import * as apiRoutes from 'src/libs/apiRoutes'

import { fetchWatchlist } from '../actions'

const accountId = 1234
const sessionId = 'test/session_id'
jest.mock('src/store/session/selectors', () => ({
  accountSelector: () => ({ id: accountId }),
  sessionIdSelector: () => sessionId,
}))

describe('fetchWatchlist', () => {
  const getWatchlist = jest.spyOn(apiRoutes, 'getWatchlist')
  const errorMessage = 'Something went wrong!'
  const page = '1'

  const thunk = fetchWatchlist(page)

  it('should handle success', async () => {
    getWatchlist.mockResolvedValueOnce(mockMoviesResponse)

    const result = await thunk(dispatch, getState, undefined)
    const { calls } = dispatch.mock

    expect(getWatchlist).toHaveBeenCalledWith({ accountId, page, sessionId })
    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toBe(fetchWatchlist.pending.type)
    expect(calls[1][0].type).toBe(fetchWatchlist.fulfilled.type)
    expect(result.payload).toEqual(mockMoviesResponse)
  })

  it('should handle failure', async () => {
    getWatchlist.mockRejectedValueOnce(errorMessage)

    const result = await thunk(dispatch, getState, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toBe(fetchWatchlist.pending.type)
    expect(calls[1][0].type).toBe(fetchWatchlist.rejected.type)
    expect(result.payload).toBe(errorMessage)
  })
})
