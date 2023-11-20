import { createReducer } from '@reduxjs/toolkit'
import setState from 'src/utils/stateHelpers/setState'

import type { WatchlistState } from './types'

import { fetchWatchlist } from './actions'

const initialState: WatchlistState = {
  data: null,
  error: null,
  loading: true
}

const watchlistReducer = createReducer(initialState, builder => {
  builder
    .addCase(fetchWatchlist.pending, setState.pending)
    .addCase(fetchWatchlist.fulfilled, setState.fulfilled)
    .addCase(fetchWatchlist.rejected, setState.rejected)
})

export default watchlistReducer
