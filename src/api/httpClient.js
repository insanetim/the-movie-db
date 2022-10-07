import axios from 'axios'

import { API_URL } from 'src/constants'

const baseURL = API_URL

const httpClient = axios.create({
  baseURL,
  timeout: 10000
})

export default httpClient
