import axios from 'axios'

import { API_URL } from 'src/constants'
import mockAxios from 'src/__mocks__/axiosMock'
import requestInterceptor from '../requestInterceptor'

const baseURL = API_URL

jest.mock('axios', () => ({ create: jest.fn() }))

it('should be axios instance', () => {
  const instance = mockAxios()
  axios.create.mockReturnValue(instance)

  const httpClient = jest.requireActual('../httpClient').default

  expect(axios.create).toHaveBeenCalledWith({
    baseURL,
    timeout: 10000
  })
  expect(httpClient).toBe(instance)
  expect(instance.interceptors.request.use).toHaveBeenCalledWith(requestInterceptor)
})
