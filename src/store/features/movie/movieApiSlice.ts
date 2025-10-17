import { getImdbInfo } from 'src/api/imdb/apiRoutes'
import {
  IMovie,
  IMovieDetailsEx,
  IMoviesList,
} from 'src/interfaces/movie.interface'
import { RootState } from 'src/store'
import { apiSlice } from 'src/store/api'

import { selectSessionId } from '../auth'
import { SearchMoviesReq } from './types'

export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMovieDetails: builder.query<IMovieDetailsEx, IMovie['id']>({
      queryFn: async (movieId, { getState }, _extraOptions, fetchBaseQuery) => {
        const sessionId = selectSessionId(getState() as RootState)!

        const { data, error } = await fetchBaseQuery({
          params: {
            append_to_response: 'images,account_states,credits',
            session_id: sessionId,
          },
          url: `/movie/${movieId}`,
        })
        if (error) return { error }

        let movieDetails = data as IMovieDetailsEx
        if (movieDetails.imdb_id) {
          const imdbInfo = await getImdbInfo({ imdbId: movieDetails.imdb_id })
          movieDetails = { ...movieDetails, imdbInfo }
        }

        return {
          data: { ...movieDetails } as IMovieDetailsEx,
        }
      },
    }),
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

export const {
  useGetMovieDetailsQuery,
  useGetSearchMoviesQuery,
  useGetTrendingMoviesQuery,
} = movieApiSlice
