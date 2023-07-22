import type { RootState } from '../index'

export const favoriteMoviesSelector = (state: RootState) => {
  return state.favorite.movies
}
