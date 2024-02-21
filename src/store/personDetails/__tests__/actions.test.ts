import { mockPersonDetails } from 'src/__mocks__/mockPerson'
import { dispatch, getState } from 'src/__mocks__/react-redux'
import * as apiRoutes from 'src/api/apiRoutes'

import { fetchPersonDetails } from '../actions'

describe('personDetails actions', () => {
  const getPersonDetails = jest.spyOn(apiRoutes, 'getPersonDetails')
  const errorMessage = 'Something went wrong!'
  const personId = 1234

  describe('fetchPersonDetails', () => {
    const thunk = fetchPersonDetails(personId)

    it('should handle success', async () => {
      getPersonDetails.mockResolvedValueOnce(mockPersonDetails)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(getPersonDetails).toHaveBeenCalledWith({ personId })
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchPersonDetails.pending.type)
      expect(calls[1][0].type).toBe(fetchPersonDetails.fulfilled.type)
      expect(result.payload).toEqual(mockPersonDetails)
    })

    it('should handle failure', async () => {
      getPersonDetails.mockRejectedValueOnce(errorMessage)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchPersonDetails.pending.type)
      expect(calls[1][0].type).toBe(fetchPersonDetails.rejected.type)
      expect(result.payload).toBe(errorMessage)
    })
  })
})
