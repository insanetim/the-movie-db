import type { RootState } from '../index'

const favoriteMoviesSelector = (state: RootState) => {
  return state.favorite.movies
}

const favoriteLoadingSelector = (state: RootState) => {
  return state.favorite.loading
}

const favoriteErrorSelector = (state: RootState) => {
  return state.favorite.error
}

export {
  favoriteErrorSelector,
  favoriteLoadingSelector,
  favoriteMoviesSelector
}
