import { createReducer } from '@reduxjs/toolkit'

import type { IFavoriteState } from './types'

import { fetchFavorite } from './actions'

const initialState: IFavoriteState = {
  error: null,
  loading: true,
  movies: null
}

const favoriteReducer = createReducer(initialState, builder => {
  builder.addCase(fetchFavorite.pending, state => {
    state.movies = null
    state.loading = true
    state.error = null
  })
  builder.addCase(fetchFavorite.fulfilled, (state, action) => {
    state.movies = action.payload
    state.loading = false
  })
  builder.addCase(fetchFavorite.rejected, (state, action) => {
    state.error = action.payload as string
    state.loading = false
  })
})

export default favoriteReducer
