import { RootState } from '../index'

const dashboardMoviesSelector = (state: RootState) => {
  return state.dashboard.data
}

export { dashboardMoviesSelector }
