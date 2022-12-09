import * as types from '../types'
import reducer from '../reducer'

describe('movieReducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({})
  })

  it('should handle SET_MOVIE', () => {
    const action = {
      type: types.SET_MOVIE,
      payload: { id: 123 }
    }
    expect(reducer(undefined, action)).toEqual({ id: 123 })
  })

  it('should handle SET_MOVIE_STATES', () => {
    const action = {
      type: types.SET_MOVIE_STATES,
      payload: { favorite: true, watchlist: true }
    }
    expect(reducer({ accountStates: { favorite: false, watchlist: false } }, action)).toEqual({
      accountStates: { favorite: true, watchlist: true }
    })
  })
})
