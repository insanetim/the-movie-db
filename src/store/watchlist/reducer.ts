import { createReducer } from '@reduxjs/toolkit'

import type { IWatchlistState } from './types'

import { fetchWatchlist } from './actions'

const initialState: IWatchlistState = {
  movies: null
}

const watchlistReducer = createReducer(initialState, builder => {
  builder.addCase(fetchWatchlist.pending, state => {
    state.movies = null
  })
  builder.addCase(fetchWatchlist.fulfilled, (state, action) => {
    state.movies = action.payload
  })
})

export default watchlistReducer
