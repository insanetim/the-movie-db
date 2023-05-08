import type { RootState } from '../index'

export const favoriteMoviesSelector = (state: RootState) => {
  return state.favorite.movies
}
export const favoriteLoadingSelector = (state: RootState) => {
  return state.favorite.loading
}
export const favoriteErrorSelector = (state: RootState) => {
  return state.favorite.error
}
