import * as types from '../types'
import reducer from '../reducers'

describe('listsReducer', () => {
  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual({
      lists: {},
      list: {}
    })
  })

  it('should handle SET_LISTS', () => {
    const action = {
      type: types.SET_LISTS,
      payload: { id: 1 }
    }
    expect(reducer(undefined, action)).toEqual({
      lists: { id: 1 },
      list: {}
    })
  })

  it('should handle SET_LIST', () => {
    const action = {
      type: types.SET_LIST,
      payload: { id: 1 }
    }
    expect(reducer(undefined, action)).toEqual({
      lists: {},
      list: { id: 1 }
    })
  })
})
