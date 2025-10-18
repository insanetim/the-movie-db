import { MutationResponse } from 'src/interfaces/global.interface'
import { IMoviesList } from 'src/interfaces/movie.interface'
import { RootState } from 'src/store'
import { apiSlice } from 'src/store/api'

import { selectAccount, selectSessionId } from '../auth'
import { moviesApiSlice } from '../movies'
import { AddToWatchlistReq } from './types'

export const watchlistApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ['WatchlistMovies'] })
  .injectEndpoints({
    endpoints: builder => ({
      addToWatchlist: builder.mutation<MutationResponse, AddToWatchlistReq>({
        invalidatesTags: ['WatchlistMovies'],
        onQueryStarted: async (
          { inWatchlist, movieId },
          { dispatch, queryFulfilled }
        ) => {
          const patchResult = dispatch(
            moviesApiSlice.util.updateQueryData(
              'getMovieDetails',
              movieId,
              draft => {
                draft.account_states.watchlist = inWatchlist
              }
            )
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        queryFn: async (
          { inWatchlist, movieId },
          { getState },
          _extraOptions,
          fetchBaseQuery
        ) => {
          const account = selectAccount(getState() as RootState)!
          const sessionId = selectSessionId(getState() as RootState)!

          const { data, error } = await fetchBaseQuery({
            body: {
              media_id: movieId,
              media_type: 'movie',
              watchlist: inWatchlist,
            },
            method: 'post',
            params: { session_id: sessionId },
            url: `/account/${account.id}/watchlist`,
          })
          if (error) return { error }

          return { data: data as MutationResponse }
        },
      }),
      getWatchlistMovies: builder.query<IMoviesList, string>({
        providesTags: ['WatchlistMovies'],
        queryFn: async (page, { getState }, _extraOptions, fetchBaseQuery) => {
          const account = selectAccount(getState() as RootState)!
          const sessionId = selectSessionId(getState() as RootState)!

          const { data, error } = await fetchBaseQuery({
            params: { page, session_id: sessionId },
            url: `/account/${account.id}/watchlist/movies`,
          })
          if (error) return { error }

          return { data: data as IMoviesList }
        },
      }),
    }),
  })

export const { useAddToWatchlistMutation, useGetWatchlistMoviesQuery } =
  watchlistApiSlice
