import { createReducer } from '@reduxjs/toolkit'

import type { IDashboardState } from './types'

import { fetchSearch, fetchTrending } from './actions'

const initalState: IDashboardState = {
  movies: null
}

const dashboardReducer = createReducer(initalState, builder => {
  builder.addCase(fetchTrending.pending, state => {
    state.movies = null
  })
  builder.addCase(fetchTrending.fulfilled, (state, action) => {
    state.movies = action.payload
  })
  builder.addCase(fetchSearch.pending, state => {
    state.movies = null
  })
  builder.addCase(fetchSearch.fulfilled, (state, action) => {
    state.movies = action.payload
  })
})

export default dashboardReducer
