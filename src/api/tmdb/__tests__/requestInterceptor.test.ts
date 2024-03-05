import { InternalAxiosRequestConfig } from 'axios'
import { TMDB_ACCESS_TOKEN_AUTH } from 'src/constants/app'

import requestInterceptor from '../requestInterceptor'

describe('requestInterceptor', () => {
  it('should return correct result', () => {
    const config = { headers: {} } as InternalAxiosRequestConfig
    const result = requestInterceptor(config)

    expect(result.headers.Accept).toBe('application/json')
    expect(result.headers.Authorization).toBe(
      `Bearer ${TMDB_ACCESS_TOKEN_AUTH}`
    )
  })
})
