import { combineReducers, createReducer } from '@reduxjs/toolkit'

import type { IDashboardState } from './types'
import { fetchSearch, fetchTrending, setSearchPage, setTrendingPage } from './actions'

const initalState: IDashboardState = {
  movies: null,
  page: 1,
  loading: true,
  error: null
}

export const trendingReducer = createReducer(initalState, builder => {
  builder.addCase(fetchTrending.pending, (state, action) => {
    state.movies = null
    state.page = action.meta.arg
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
  builder.addCase(setTrendingPage, (state, action) => {
    state.page = action.payload
  })
})

export const searchReducer = createReducer(initalState, builder => {
  builder.addCase(fetchSearch.pending, (state, action) => {
    state.movies = null
    state.page = action.meta.arg.page
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
  builder.addCase(setSearchPage, (state, action) => {
    state.page = action.payload
  })
})

export default combineReducers({
  trending: trendingReducer,
  search: searchReducer
})
