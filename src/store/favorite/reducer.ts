import { createReducer } from '@reduxjs/toolkit'

import { fetchFavorite } from './actions'
import { FavoriteState } from './types'

const initialState: FavoriteState = {
  data: null,
  error: null,
  loading: true,
}

const favoriteReducer = createReducer(initialState, builder => {
  builder
    .addCase(fetchFavorite.pending, state => {
      state.loading = true
      state.data = null
      state.error = null
    })
    .addCase(fetchFavorite.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    .addCase(fetchFavorite.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
})

export default favoriteReducer
