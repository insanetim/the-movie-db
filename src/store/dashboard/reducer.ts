import { combineReducers, createReducer } from '@reduxjs/toolkit'

import type { IDashboardState } from './types'

import { fetchSearch, fetchTrending } from './actions'

const initalState: IDashboardState = {
  error: null,
  loading: true,
  movies: null
}

export const trendingReducer = createReducer(initalState, builder => {
  builder.addCase(fetchTrending.pending, state => {
    state.movies = null
    state.loading = true
    state.error = null
  })
  builder.addCase(fetchTrending.fulfilled, (state, action) => {
    state.movies = action.payload
    state.loading = false
  })
  builder.addCase(fetchTrending.rejected, (state, action) => {
    state.error = action.payload as string
    state.loading = false
  })
})

export const searchReducer = createReducer(initalState, builder => {
  builder.addCase(fetchSearch.pending, state => {
    state.movies = null
    state.loading = true
    state.error = null
  })
  builder.addCase(fetchSearch.fulfilled, (state, action) => {
    state.movies = action.payload
    state.loading = false
  })
  builder.addCase(fetchSearch.rejected, (state, action) => {
    state.error = action.payload as string
    state.loading = false
  })
})

export default combineReducers({
  search: searchReducer,
  trending: trendingReducer
})
