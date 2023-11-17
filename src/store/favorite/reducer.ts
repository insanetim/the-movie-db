import { createReducer } from '@reduxjs/toolkit'

import type { FavoriteState } from './types'

import { fetchFavorite } from './actions'

const initialState: FavoriteState = {
  data: null,
  error: null,
  loading: true
}

const favoriteReducer = createReducer(initialState, builder => {
  builder.addCase(fetchFavorite.pending, state => {
    state.loading = true
    state.data = null
    state.error = null
  })
  builder.addCase(fetchFavorite.fulfilled, (state, action) => {
    state.loading = false
    state.data = action.payload
  })
  builder.addCase(fetchFavorite.rejected, (state, action) => {
    state.loading = false
    state.error = action.payload as string
  })
})

export default favoriteReducer
