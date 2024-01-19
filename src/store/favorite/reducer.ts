import { createSlice } from '@reduxjs/toolkit'

import { fetchFavorite } from './actions'
import { FavoriteState } from './types'

const initialState: FavoriteState = {
  data: null,
  error: null,
  loading: true,
}

const favoriteSlice = createSlice({
  extraReducers(builder) {
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
  },
  initialState,
  name: 'favorite',
  reducers: {},
  selectors: {
    favoriteErrorSelector: state => state.error,
    favoriteLoadingSelector: state => state.loading,
    favoriteMoviesSelector: state => state.data,
  },
})

export const {
  favoriteErrorSelector,
  favoriteLoadingSelector,
  favoriteMoviesSelector,
} = favoriteSlice.selectors

export default favoriteSlice.reducer
