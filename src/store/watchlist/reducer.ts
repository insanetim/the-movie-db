import { createReducer } from '@reduxjs/toolkit'

import type { IWatchlistState } from './types'
import { fetchWatchlist } from './actions'

const initialState: IWatchlistState = {
  movies: null,
  loading: true,
  error: null
}

const watchlistReducer = createReducer(initialState, builder => {
  builder.addCase(fetchWatchlist.pending, state => {
    state.movies = null
    state.loading = true
    state.error = null
  })
  builder.addCase(fetchWatchlist.fulfilled, (state, action) => {
    state.movies = action.payload
    state.loading = false
  })
  builder.addCase(fetchWatchlist.rejected, (state, action) => {
    state.error = action.payload as string
    state.loading = false
  })
})

export default watchlistReducer
