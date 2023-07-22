import type { RootState } from '../index'

export const dashboardMoviesSelector = (state: RootState) => {
  return state.dashboard.movies
}
