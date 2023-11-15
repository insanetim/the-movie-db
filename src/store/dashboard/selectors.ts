import type { RootState } from '../index'

const dashboardMoviesSelector = (state: RootState) => {
  return state.dashboard.movies
}

export { dashboardMoviesSelector }
