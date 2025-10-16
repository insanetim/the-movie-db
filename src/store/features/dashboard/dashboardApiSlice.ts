import { IMoviesList } from 'src/interfaces/movie.interface'
import { apiSlice } from 'src/store/api'

import { SearchMoviesReq } from './types'

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getSearchMovies: builder.query<IMoviesList, SearchMoviesReq>({
      query: params => ({
        params,
        url: '/search/movie',
      }),
    }),
    getTrendingMovies: builder.query<IMoviesList, { page: string }>({
      query: params => ({
        params,
        url: '/trending/movie/week',
      }),
    }),
  }),
})

export const { useGetSearchMoviesQuery, useGetTrendingMoviesQuery } =
  dashboardApiSlice
