import { mergeDeepRight } from 'ramda'

import { fetchListDetails } from '../actions'
import listDetailReducer from '../reducer'
import { ListDetailsState } from '../types'

describe('listDetailsReducer', () => {
  const state: ListDetailsState = {
    data: null,
    error: null,
    loading: true,
  }

  it('should return initial state with empty action', () => {
    const result = listDetailReducer(undefined, { type: '' })

    expect(result).toEqual(state)
  })

  it('should handle "fetchListDetail/pending" action', () => {
    const action = { type: fetchListDetails.pending.type }
    const result = listDetailReducer(state, action)

    expect(result).toEqual(state)
  })

  it('should handle "fetchListDetail/fulfilled" action', () => {
    const action = {
      payload: 'test/data',
      type: fetchListDetails.fulfilled.type,
    }
    const newState = mergeDeepRight(state, {
      data: action.payload,
      loading: false,
    })
    const result = listDetailReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "fetchListDetail/rejected" action', () => {
    const action = {
      payload: 'test/error',
      type: fetchListDetails.rejected.type,
    }
    const newState = mergeDeepRight(state, {
      error: action.payload,
      loading: false,
    })
    const result = listDetailReducer(state, action)

    expect(result).toEqual(newState)
  })
})
