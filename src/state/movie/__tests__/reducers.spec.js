import * as types from '../types'
import reducer from '../reducers'

describe('movieReducer', () => {
  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual({
      movie: {},
      movieInFavorites: null,
      movieInWatchlist: null
    })
  })

  it('should handle SET_MOVIE', () => {
    const action = {
      type: types.SET_MOVIE,
      payload: { id: 1 }
    }
    expect(reducer(undefined, action)).toEqual({
      movie: { id: 1 },
      movieInFavorites: null,
      movieInWatchlist: null
    })
  })

  it('should handle SET_MOVIE_IN_FAVORITES', () => {
    const action = {
      type: types.SET_MOVIE_IN_FAVORITES,
      payload: true
    }
    expect(reducer(undefined, action)).toEqual({
      movie: {},
      movieInFavorites: true,
      movieInWatchlist: null
    })
  })

  it('should handle SET_MOVIE_IN_WATCHLIST', () => {
    const action = {
      type: types.SET_MOVIE_IN_WATCHLIST,
      payload: true
    }
    expect(reducer(undefined, action)).toEqual({
      movie: {},
      movieInFavorites: null,
      movieInWatchlist: true
    })
  })
})
