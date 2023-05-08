import { InternalAxiosRequestConfig } from 'axios'

import { API_KEY } from 'src/constants/app'
import requestInterceptor from '../requestInterceptor'

describe('requestInterceptor', () => {
  it('should return correct result', () => {
    expect(requestInterceptor({ params: {} } as InternalAxiosRequestConfig)).toEqual({
      params: {
        api_key: API_KEY
      }
    })
  })
})
