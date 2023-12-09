import { createReducer } from '@reduxjs/toolkit'

import { fetchSearch, fetchTrending } from './actions'
import { DashboardState } from './types'

const initialState: DashboardState = {
  data: null,
}

const dashboardReducer = createReducer(initialState, builder => {
  builder
    .addCase(fetchTrending.pending, state => {
      state.data = null
    })
    .addCase(fetchTrending.fulfilled, (state, action) => {
      state.data = action.payload
    })
    .addCase(fetchSearch.pending, state => {
      state.data = null
    })
    .addCase(fetchSearch.fulfilled, (state, action) => {
      state.data = action.payload
    })
})

export default dashboardReducer
