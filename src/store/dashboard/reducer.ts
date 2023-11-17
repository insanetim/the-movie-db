import { createReducer } from '@reduxjs/toolkit'

import type { DashboardState } from './types'

import { fetchSearch, fetchTrending } from './actions'

const initialState: DashboardState = {
  data: null
}

const dashboardReducer = createReducer(initialState, builder => {
  builder.addCase(fetchTrending.pending, state => {
    state.data = null
  })
  builder.addCase(fetchTrending.fulfilled, (state, action) => {
    state.data = action.payload
  })
  builder.addCase(fetchSearch.pending, state => {
    state.data = null
  })
  builder.addCase(fetchSearch.fulfilled, (state, action) => {
    state.data = action.payload
  })
})

export default dashboardReducer
