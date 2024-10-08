import { mockListDetails } from 'src/__mocks__/mockList'
import * as apiRoutes from 'src/api/tmdb/apiRoutes'

import { fetchListDetails } from '../actions'

const listId = 1234
jest.mock('src/store/createdLists/selectors', () => ({
  createdListsSelector: () => ({
    results: [{ id: listId, name: 'test/list' }],
  }),
}))

describe('listDetails actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  const getListDetails = jest.spyOn(apiRoutes, 'getListDetails')
  const errorMessage = 'Something went wrong!'
  const page = '1'

  describe('fetchListDetail', () => {
    const thunk = fetchListDetails({ listId, page })

    it('should handle success', async () => {
      getListDetails.mockResolvedValueOnce(mockListDetails)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(getListDetails).toHaveBeenCalledWith({ listId, page })
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchListDetails.pending.type)
      expect(calls[1][0].type).toBe(fetchListDetails.fulfilled.type)
      expect(result.payload).toEqual(mockListDetails)
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
