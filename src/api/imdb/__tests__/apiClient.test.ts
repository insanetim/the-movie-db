import { IMDB_API_URL } from 'src/constants'

import imdbClient from '../apiClient'

describe('imdbClient', () => {
  it('should configure axios client with base URL and timeout', () => {
    expect(imdbClient.defaults.baseURL).toBe(IMDB_API_URL)
    expect(imdbClient.defaults.timeout).toBe(10000)
  })
})
