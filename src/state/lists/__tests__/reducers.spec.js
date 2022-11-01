import * as types from '../types'
import { lists, list } from '../reducers'

describe('listsReducer', () => {
  it('should handle SET_LISTS', () => {
    const action = {
      type: types.SET_LISTS,
      payload: { id: 1 }
    }
    expect(lists(undefined, action)).toEqual({ id: 1 })
  })

  it('should handle SET_LIST', () => {
    const action = {
      type: types.SET_LIST,
      payload: { id: 1 }
    }
    expect(list(undefined, action)).toEqual({ id: 1 })
  })
})
