import { createReducer } from '@reduxjs/toolkit'
import setState from 'src/utils/stateHelpers/setState'

import type { FavoriteState } from './types'

import { fetchFavorite } from './actions'

const initialState: FavoriteState = {
  data: null,
  error: null,
  loading: true
}

const favoriteReducer = createReducer(initialState, builder => {
  builder
    .addCase(fetchFavorite.pending, setState.pending)
    .addCase(fetchFavorite.fulfilled, setState.fulfilled)
    .addCase(fetchFavorite.rejected, setState.rejected)
})

export default favoriteReducer
