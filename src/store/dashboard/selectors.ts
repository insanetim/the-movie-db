import type { RootState } from '../index'

export const trendingMoviesSelector = (state: RootState) => {
  return state.dashboard.trending.movies
}
export const trendingPageSelector = (state: RootState) => {
  return state.dashboard.trending.page
}
export const trendingLoadingSelector = (state: RootState) => {
  return state.dashboard.trending.loading
}
export const trendingErrorSelector = (state: RootState) => {
  return state.dashboard.trending.error
}
export const searchMoviesSelector = (state: RootState) => {
  return state.dashboard.search.movies
}
export const searchPageSelector = (state: RootState) => {
  return state.dashboard.search.page
}
export const searchLoadingSelector = (state: RootState) => {
  return state.dashboard.search.loading
}
export const searchErrorSelector = (state: RootState) => {
  return state.dashboard.search.error
}
