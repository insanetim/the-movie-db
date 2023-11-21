import setState from 'src/utils/stateHelpers/setState'

import { fetchListDetail, fetchLists } from '../actions'
import listsReducer from '../reducer'
import { ListsState } from '../types'

jest.mock('src/utils/stateHelpers/setState')

describe('listsReducer', () => {
  const state: ListsState = {
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

  it('should return initial state with empty action', () => {
    const result = listsReducer(undefined, { type: '' })

    expect(result).toEqual(state)
  })

  it('should handle fetchLists/pending action', () => {
    const action = { type: fetchLists.pending.type }
    listsReducer(state, action)

    expect(setState.pending).toHaveBeenCalled()
  })

  it('should handle fetchLists/fulfilled action', () => {
    const action = {
      payload: 'test/data',
      type: fetchLists.fulfilled.type
    }
    listsReducer(state, action)

    expect(setState.fulfilled).toHaveBeenCalled()
  })

  it('should handle fetchLists/rejected action', () => {
    const action = {
      payload: 'test/error',
      type: fetchLists.rejected.type
    }
    listsReducer(state, action)

    expect(setState.rejected).toHaveBeenCalled()
  })

  it('should handle fetchListDetail/pending action', () => {
    const action = { type: fetchListDetail.pending.type }
    listsReducer(state, action)

    expect(setState.pending).toHaveBeenCalled()
  })

  it('should handle fetchListDetail/fulfilled action', () => {
    const action = {
      payload: 'test/data',
      type: fetchListDetail.fulfilled.type
    }
    listsReducer(state, action)

    expect(setState.fulfilled).toHaveBeenCalled()
  })

  it('should handle fetchListDetail/rejected action', () => {
    const action = {
      payload: 'test/error',
      type: fetchListDetail.rejected.type
    }
    listsReducer(state, action)

    expect(setState.rejected).toHaveBeenCalled()
  })
})
