import * as types from '../types'
import { movie, movieInFavorites, movieInWatchlist } from '../reducers'

describe('movieReducer', () => {
  it('should handle SET_MOVIE', () => {
    const action = {
      type: types.SET_MOVIE,
      payload: { id: 1 }
    }
    expect(movie(undefined, action)).toEqual({ id: 1 })
  })

  it('should handle SET_MOVIE_IN_FAVORITES', () => {
    const action = {
      type: types.SET_MOVIE_IN_FAVORITES,
      payload: true
    }
    expect(movieInFavorites(undefined, action)).toBe(true)
  })

  it('should handle SET_MOVIE_IN_WATCHLIST', () => {
    const action = {
      type: types.SET_MOVIE_IN_WATCHLIST,
      payload: true
    }
    expect(movieInWatchlist(undefined, action)).toBe(true)
  })
})
