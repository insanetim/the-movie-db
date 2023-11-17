import { createReducer } from '@reduxjs/toolkit'

import type { WatchlistState } from './types'

import { fetchWatchlist } from './actions'

const initialState: WatchlistState = {
  data: null,
  error: null,
  loading: true
}

const watchlistReducer = createReducer(initialState, builder => {
  builder.addCase(fetchWatchlist.pending, state => {
    state.loading = true
    state.data = null
    state.error = null
  })
  builder.addCase(fetchWatchlist.fulfilled, (state, action) => {
    state.loading = false
    state.data = action.payload
  })
  builder.addCase(fetchWatchlist.rejected, (state, action) => {
    state.loading = false
    state.error = action.payload as string
  })
})

export default watchlistReducer
