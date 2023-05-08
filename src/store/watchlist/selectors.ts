import type { RootState } from '../index'

export const watchlistMoviesSelector = (state: RootState) => {
  return state.watchlist.movies
}
export const watchlistLoadingSelector = (state: RootState) => {
  return state.watchlist.loading
}
export const watchlistErrorSelector = (state: RootState) => {
  return state.watchlist.error
}
