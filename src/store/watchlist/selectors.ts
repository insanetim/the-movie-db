import type { RootState } from '../index'

const watchlistMoviesSelector = (state: RootState) => {
  return state.watchlist.movies
}

const watchlistLoadingSelector = (state: RootState) => {
  return state.watchlist.loading
}

const watchlistErrorSelector = (state: RootState) => {
  return state.watchlist.error
}

export {
  watchlistErrorSelector,
  watchlistLoadingSelector,
  watchlistMoviesSelector
}
