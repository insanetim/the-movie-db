import * as types from '../types'
import reducer from '../reducers'

describe('favoritesReducer', () => {
  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should handle SET_FAVORITES', () => {
    const action = {
      type: types.SET_FAVORITES,
      payload: { id: 1 }
    }
    expect(reducer(undefined, action)).toEqual({ id: 1 })
  })
})
