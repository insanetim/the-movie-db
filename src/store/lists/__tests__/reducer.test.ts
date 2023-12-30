import { mergeDeepRight } from 'ramda'

import { fetchListDetail, fetchLists } from '../actions'
import listsReducer from '../reducer'
import { ListsState } from '../types'

describe('listsReducer', () => {
  const state: ListsState = {
    createdLists: {
      data: null,
      error: null,
      loading: true,
    },
    listDetail: {
      data: null,
      error: null,
      loading: true,
    },
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
      createdLists: { data: action.payload, loading: false },
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
      createdLists: { error: action.payload, loading: false },
    })
    const result = listsReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "fetchListDetail/pending" action', () => {
    const action = { type: fetchListDetail.pending.type }
    const result = listsReducer(state, action)

    expect(result).toEqual(state)
  })

  it('should handle "fetchListDetail/fulfilled" action', () => {
    const action = {
      payload: 'test/data',
      type: fetchListDetail.fulfilled.type,
    }
    const newState = mergeDeepRight(state, {
      listDetail: { data: action.payload, loading: false },
    })
    const result = listsReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "fetchListDetail/rejected" action', () => {
    const action = {
      payload: 'test/error',
      type: fetchListDetail.rejected.type,
    }
    const newState = mergeDeepRight(state, {
      listDetail: { error: action.payload, loading: false },
    })
    const result = listsReducer(state, action)

    expect(result).toEqual(newState)
  })
})
