import { mockListDetail } from 'src/__mocks__/mockList'
import { dispatch, getState } from 'src/__mocks__/react-redux'
import * as apiRoutes from 'src/services/api/apiRoutes'

import { fetchListDetails } from '../actions'

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => 'test/id',
}))

const accountId = 1234
jest.mock('src/store/auth/selectors', () => ({
  accountSelector: () => ({ id: accountId }),
}))

jest.mock('src/store/movie/selectors', () => ({
  selectMovieById: () => ({ title: 'test/movie' }),
}))

const listId = 1234
jest.mock('src/store/createdLists/selectors', () => ({
  createdListsSelector: () => ({
    results: [{ id: listId, name: 'test/list' }],
  }),
}))

const sessionId = 'test/session_id'
jest.mock('src/utils/helpers/getSessionId', () => {
  return jest.fn(() => sessionId)
})

describe('listDetail actions', () => {
  const getListDetails = jest.spyOn(apiRoutes, 'getListDetails')
  const errorMessage = 'Something went wrong!'
  const page = '1'

  describe('fetchListDetail', () => {
    const thunk = fetchListDetails({ listId, page })

    it('should handle success', async () => {
      getListDetails.mockResolvedValueOnce(mockListDetail)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(getListDetails).toHaveBeenCalledWith({ listId, page })
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchListDetails.pending.type)
      expect(calls[1][0].type).toBe(fetchListDetails.fulfilled.type)
      expect(result.payload).toEqual(mockListDetail)
    })

    it('should handle failure', async () => {
      getListDetails.mockRejectedValueOnce(errorMessage)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchListDetails.pending.type)
      expect(calls[1][0].type).toBe(fetchListDetails.rejected.type)
      expect(result.payload).toBe(errorMessage)
    })
  })
})
