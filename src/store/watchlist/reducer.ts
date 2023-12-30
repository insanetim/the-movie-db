import { createReducer } from '@reduxjs/toolkit'

import { fetchWatchlist } from './actions'
import { WatchlistState } from './types'

const initialState: WatchlistState = {
  data: null,
  error: null,
  loading: true,
}

const watchlistReducer = createReducer(initialState, builder => {
  builder
    .addCase(fetchWatchlist.pending, state => {
      state.loading = true
      state.data = null
      state.error = null
    })
    .addCase(fetchWatchlist.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    .addCase(fetchWatchlist.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
})

export default watchlistReducer
