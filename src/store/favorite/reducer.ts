import { createReducer } from '@reduxjs/toolkit'

import type { IFavoriteState } from './types'

import { fetchFavorite } from './actions'

const initialState: IFavoriteState = {
  movies: null
}

const favoriteReducer = createReducer(initialState, builder => {
  builder.addCase(fetchFavorite.pending, state => {
    state.movies = null
  })
  builder.addCase(fetchFavorite.fulfilled, (state, action) => {
    state.movies = action.payload
  })
})

export default favoriteReducer
