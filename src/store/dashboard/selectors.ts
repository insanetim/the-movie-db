import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../index'

const dashboardReducer = (state: RootState) => state.dashboard

const dashboardMoviesSelector = createSelector(
  [dashboardReducer],
  dashboard => dashboard.data
)

export { dashboardMoviesSelector }
