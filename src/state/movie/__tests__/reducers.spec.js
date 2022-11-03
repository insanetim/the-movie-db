import * as types from '../types'
import reducer from '../reducers'

describe('movieReducer', () => {
  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should handle SET_MOVIE', () => {
    const action = {
      type: types.SET_MOVIE,
      payload: { id: 1 }
    }
    expect(reducer(undefined, action)).toEqual({ id: 1 })
  })

  it('should handle SET_MOVIE_STATES', () => {
    const action = {
      type: types.SET_MOVIE_STATES,
      payload: { favorite: true, watchlist: true }
    }
    expect(reducer({ accountStates: { favorite: false } }, action)).toEqual({
      accountStates: { favorite: true, watchlist: true }
    })
  })
})
