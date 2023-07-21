import type { RootState } from '../index'

export const dashboardMoviesSelector = (state: RootState) => {
  return state.dashboard.movies
}
export const dashboardLoadingSelector = (state: RootState) => {
  return state.dashboard.loading
}
export const dashboardErrorSelector = (state: RootState) => {
  return state.dashboard.error
}
