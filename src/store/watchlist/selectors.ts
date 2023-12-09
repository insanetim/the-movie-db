import { RootState } from '../index'

const watchlistMoviesSelector = (state: RootState) => {
  return state.watchlist.data
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
  watchlistMoviesSelector,
}
