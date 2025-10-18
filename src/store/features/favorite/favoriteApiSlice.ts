import { MutationResponse } from 'src/interfaces/global.interface'
import { IMoviesList } from 'src/interfaces/movie.interface'
import { RootState } from 'src/store'
import { apiSlice } from 'src/store/api'

import { selectAccount, selectSessionId } from '../auth'
import { moviesApiSlice } from '../movies'
import { AddToFavoriteReq } from './types'

export const favoriteApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ['FavoriteMovies'] })
  .injectEndpoints({
    endpoints: builder => ({
      addToFavorite: builder.mutation<MutationResponse, AddToFavoriteReq>({
        invalidatesTags: ['FavoriteMovies'],
        onQueryStarted: async (
          { inFavorite, movieId },
          { dispatch, queryFulfilled }
        ) => {
          const patchResult = dispatch(
            moviesApiSlice.util.updateQueryData(
              'getMovieDetails',
              movieId,
              draft => {
                draft.account_states.favorite = inFavorite
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
          { inFavorite, movieId },
          { getState },
          _extraOptions,
          fetchBaseQuery
        ) => {
          const account = selectAccount(getState() as RootState)!
          const sessionId = selectSessionId(getState() as RootState)!

          const { data, error } = await fetchBaseQuery({
            body: {
              favorite: inFavorite,
              media_id: movieId,
              media_type: 'movie',
            },
            method: 'post',
            params: { session_id: sessionId },
            url: `/account/${account.id}/favorite`,
          })
          if (error) return { error }

          return { data: data as MutationResponse }
        },
      }),
      getFavoriteMovies: builder.query<IMoviesList, string>({
        providesTags: ['FavoriteMovies'],
        queryFn: async (page, { getState }, _extraOptions, fetchBaseQuery) => {
          const account = selectAccount(getState() as RootState)!
          const sessionId = selectSessionId(getState() as RootState)!

          const { data, error } = await fetchBaseQuery({
            params: { page, session_id: sessionId },
            url: `/account/${account.id}/favorite/movies`,
          })
          if (error) return { error }

          return { data: data as IMoviesList }
        },
      }),
    }),
  })

export const { useAddToFavoriteMutation, useGetFavoriteMoviesQuery } =
  favoriteApiSlice
