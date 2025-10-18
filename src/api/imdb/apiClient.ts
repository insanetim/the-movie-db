import axios from 'axios'
import { IMDB_API_URL } from 'src/constants'

const baseURL = IMDB_API_URL

const imdbClient = axios.create({
  baseURL,
  timeout: 10000,
})

export default imdbClient
