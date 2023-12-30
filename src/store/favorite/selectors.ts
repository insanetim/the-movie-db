import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../index'

const favoriteReducer = (state: RootState) => state.favorite

const favoriteMoviesSelector = createSelector(
  [favoriteReducer],
  favorite => favorite.data
)

const favoriteLoadingSelector = createSelector(
  [favoriteReducer],
  favorite => favorite.loading
)

const favoriteErrorSelector = createSelector(
  [favoriteReducer],
  favorite => favorite.error
)

export {
  favoriteErrorSelector,
  favoriteLoadingSelector,
  favoriteMoviesSelector,
}
