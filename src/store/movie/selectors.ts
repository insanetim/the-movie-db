import type { RootState } from '../index'

export const movieSelector = (state: RootState) => {
  return state.movie.movieDetail
}
