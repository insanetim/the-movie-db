import { mockImdbInfo } from 'src/__mocks__/mockMovie'

import imdbClient from '../apiClient'
import * as imdbRoutes from '../apiRoutes'

describe('imdbRoutes', () => {
  const requestSpy = jest.spyOn(imdbClient, 'request')
  const imdbId = 'tt1234567'

  it('should handle "getImdbInfo" request', async () => {
    const request = { url: `/title/${imdbId}` }
    const response = { data: mockImdbInfo }
    requestSpy.mockResolvedValueOnce(response)

    const result = await imdbRoutes.getImdbInfo({ imdbId })

    expect(requestSpy).toHaveBeenCalledWith(request)
    expect(result).toEqual(mockImdbInfo)
  })
})
