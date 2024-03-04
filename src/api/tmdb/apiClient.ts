import axios from 'axios'
import { TMDB_API_URL } from 'src/constants/app'

import requestInterceptor from './requestInterceptor'

const baseURL = TMDB_API_URL

const tmdbClient = axios.create({
  baseURL,
  timeout: 10000,
})

tmdbClient.interceptors.request.use(requestInterceptor)

export default tmdbClient
