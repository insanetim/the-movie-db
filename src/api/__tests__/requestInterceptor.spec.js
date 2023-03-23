import { API_KEY } from 'src/constants'
import requestInterceptor from '../requestInterceptor'

describe('requestInterceptor', () => {
  it('should return correct result', () => {
    expect(requestInterceptor({ params: {} })).toEqual({
      params: {
        api_key: API_KEY
      }
    })
  })
})
