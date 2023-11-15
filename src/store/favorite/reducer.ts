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
    state.loading = true
    state.movies = null
    state.error = null
  })
  builder.addCase(fetchFavorite.fulfilled, (state, action) => {
    state.loading = false
    state.movies = action.payload
  })
  builder.addCase(fetchFavorite.rejected, (state, action) => {
    state.loading = false
    state.error = action.payload as string
  })
})

export default favoriteReducer
