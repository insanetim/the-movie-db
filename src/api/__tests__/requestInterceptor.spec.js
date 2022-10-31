import { API_KEY } from 'src/constants'
import requestInterceptor from '../requestInterceptor'

it('requestInterceptor should return correct result', () => {
  expect(requestInterceptor({ params: {} })).toEqual({
    params: {
      api_key: API_KEY
    }
  })
})
