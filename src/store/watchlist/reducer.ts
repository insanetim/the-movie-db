import { createReducer } from '@reduxjs/toolkit'

import type { IWatchlistState } from './types'

import { fetchWatchlist } from './actions'

const initialState: IWatchlistState = {
  error: null,
  loading: true,
  movies: null
}

const watchlistReducer = createReducer(initialState, builder => {
  builder.addCase(fetchWatchlist.pending, state => {
    state.loading = true
    state.movies = null
    state.error = null
  })
  builder.addCase(fetchWatchlist.fulfilled, (state, action) => {
    state.loading = false
    state.movies = action.payload
  })
  builder.addCase(fetchWatchlist.rejected, (state, action) => {
    state.loading = false
    state.error = action.payload as string
  })
})

export default watchlistReducer
