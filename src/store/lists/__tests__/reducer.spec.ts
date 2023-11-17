import { mergeDeepRight } from 'ramda'

import { fetchListDetail, fetchLists } from '../actions'
import listsReducer from '../reducer'
import { ListsState } from '../types'

describe('listsReducer', () => {
  const initialState: ListsState = {
    createdLists: {
      data: null,
      error: null,
      loading: true
    },
    listDetail: {
      data: null,
      error: null,
      loading: true
    }
  }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(listsReducer(initialState, action)).toEqual(initialState)
  })

  it('should handle fetchLists/pending', () => {
    const action = {
      type: fetchLists.pending.toString()
    }

    expect(listsReducer(initialState, action)).toEqual(initialState)
  })

  it('should handle fetchLists/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchLists.fulfilled.toString()
    }
    const expectedState = mergeDeepRight(initialState, {
      createdLists: {
        data: action.payload,
        loading: false
      }
    })

    expect(listsReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle fetchLists/rejected', () => {
    const action = {
      payload: 'test/error',
      type: fetchLists.rejected.toString()
    }
    const expectedState = mergeDeepRight(initialState, {
      createdLists: {
        error: action.payload,
        loading: false
      }
    })

    expect(listsReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle fetchListDetail/pending', () => {
    const action = {
      type: fetchListDetail.pending.toString()
    }

    expect(listsReducer(initialState, action)).toEqual(initialState)
  })

  it('should handle fetchListDetail/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchListDetail.fulfilled.toString()
    }
    const expectedState = mergeDeepRight(initialState, {
      listDetail: {
        data: action.payload,
        loading: false
      }
    })

    expect(listsReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle fetchListDetail/rejected', () => {
    const action = {
      payload: 'test/error',
      type: fetchListDetail.rejected.toString()
    }
    const expectedState = mergeDeepRight(initialState, {
      listDetail: {
        error: action.payload,
        loading: false
      }
    })

    expect(listsReducer(initialState, action)).toEqual(expectedState)
  })
})
