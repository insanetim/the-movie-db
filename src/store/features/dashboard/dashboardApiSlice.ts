import { IMoviesList } from 'src/interfaces/movie.interface'
import { apiSlice } from 'src/store/api'

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTrendingMovies: builder.query<IMoviesList, string>({
      query: page => ({
        params: { page },
        url: '/trending/movie/week',
      }),
    }),
  }),
})

export const { useGetTrendingMoviesQuery } = dashboardApiSlice
