import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../index'

const watchlistReducer = (state: RootState) => state.watchlist

const watchlistMoviesSelector = createSelector(
  [watchlistReducer],
  watchlist => watchlist.data
)

const watchlistLoadingSelector = createSelector(
  [watchlistReducer],
  watchlist => watchlist.loading
)

const watchlistErrorSelector = createSelector(
  [watchlistReducer],
  watchlist => watchlist.error
)

export {
  watchlistErrorSelector,
  watchlistLoadingSelector,
  watchlistMoviesSelector,
}
