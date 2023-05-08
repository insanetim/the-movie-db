import type { RootState } from '../index'

export const movieSelector = (state: RootState) => {
  return state.movie.movieDetail
}
export const movieLoadingSelector = (state: RootState) => {
  return state.movie.loading
}
export const movieErrorSelector = (state: RootState) => {
  return state.movie.error
}
