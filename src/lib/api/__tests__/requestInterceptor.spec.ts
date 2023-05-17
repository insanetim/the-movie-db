import type { InternalAxiosRequestConfig } from 'axios'

import { ACCESS_TOKEN_AUTH } from 'src/constants/app'
import requestInterceptor from '../requestInterceptor'

describe('requestInterceptor', () => {
  it('should return correct result', () => {
    expect(requestInterceptor({ headers: {} } as InternalAxiosRequestConfig)).toEqual({
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN_AUTH}`
      }
    })
  })
})
