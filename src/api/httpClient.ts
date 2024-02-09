import axios from 'axios'
import { API_URL } from 'src/constants/app'

import requestInterceptor from './requestInterceptor'

const baseURL = API_URL

const httpClient = axios.create({
  baseURL,
  timeout: 10000,
})

httpClient.interceptors.request.use(requestInterceptor)

export default httpClient
