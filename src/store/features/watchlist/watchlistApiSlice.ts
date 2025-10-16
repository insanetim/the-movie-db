import { RootState } from 'src/store'
import { apiSlice } from 'src/store/api'

import { selectAccount, selectSessionId } from '../auth'
import { movieDetailsApiSlice } from '../movieDetails'
import { AddToWatchlistReq, AddToWatchlistRes } from './types'

export const watchlistApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addToWatchlist: builder.mutation<AddToWatchlistRes, AddToWatchlistReq>({
      onQueryStarted: async (
        { inWatchlist, movieId },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          movieDetailsApiSlice.util.updateQueryData(
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

        return { data: data as AddToWatchlistRes }
      },
    }),
  }),
})

export const { useAddToWatchlistMutation } = watchlistApiSlice
