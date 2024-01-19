import { mergeDeepRight } from 'ramda'

import { fetchLists } from '../actions'
import listsReducer from '../reducer'
import { CreatedListsState } from '../types'

describe('listsReducer', () => {
  const state: CreatedListsState = {
    data: null,
    error: null,
    loading: true,
  }

  it('should return initial state with empty action', () => {
    const result = listsReducer(undefined, { type: '' })

    expect(result).toEqual(state)
  })

  it('should handle "fetchLists/pending" action', () => {
    const action = { type: fetchLists.pending.type }
    const result = listsReducer(state, action)

    expect(result).toEqual(state)
  })

  it('should handle "fetchLists/fulfilled" action', () => {
    const action = {
      payload: 'test/data',
      type: fetchLists.fulfilled.type,
    }
    const newState = mergeDeepRight(state, {
      data: action.payload,
      loading: false,
    })
    const result = listsReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "fetchLists/rejected" action', () => {
    const action = {
      payload: 'test/error',
      type: fetchLists.rejected.type,
    }
    const newState = mergeDeepRight(state, {
      error: action.payload,
      loading: false,
    })
    const result = listsReducer(state, action)

    expect(result).toEqual(newState)
  })
})
