import type { RootState } from '../index'

export const watchlistMoviesSelector = (state: RootState) => {
  return state.watchlist.movies
}
