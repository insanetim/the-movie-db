import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { TMDB_ACCESS_TOKEN_AUTH, TMDB_API_URL } from 'src/constants/app'

const baseQuery = fetchBaseQuery({
  baseUrl: TMDB_API_URL,
  prepareHeaders: headers => {
    headers.set('Authorization', `Bearer ${TMDB_ACCESS_TOKEN_AUTH}`)
    return headers
  },
})

export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
})
