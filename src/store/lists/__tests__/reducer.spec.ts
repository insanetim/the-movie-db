import setState from 'src/utils/stateHelpers/setState'

import { fetchListDetail, fetchLists } from '../actions'
import listsReducer from '../reducer'
import { ListsState } from '../types'

jest.mock('src/utils/stateHelpers/setState')

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

  it('should handle fetchLists/pending', () => {
    const action = {
      type: fetchLists.pending.toString()
    }
    listsReducer(initialState, action)

    expect(setState.pending).toHaveBeenCalled()
  })

  it('should handle fetchLists/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchLists.fulfilled.toString()
    }
    listsReducer(initialState, action)

    expect(setState.fulfilled).toHaveBeenCalled()
  })

  it('should handle fetchLists/rejected', () => {
    const action = {
      payload: 'test/error',
      type: fetchLists.rejected.toString()
    }
    listsReducer(initialState, action)

    expect(setState.rejected).toHaveBeenCalled()
  })

  it('should handle fetchListDetail/pending', () => {
    const action = {
      type: fetchListDetail.pending.toString()
    }
    listsReducer(initialState, action)

    expect(setState.pending).toHaveBeenCalled()
  })

  it('should handle fetchListDetail/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchListDetail.fulfilled.toString()
    }
    listsReducer(initialState, action)

    expect(setState.fulfilled).toHaveBeenCalled()
  })

  it('should handle fetchListDetail/rejected', () => {
    const action = {
      payload: 'test/error',
      type: fetchListDetail.rejected.toString()
    }
    listsReducer(initialState, action)

    expect(setState.rejected).toHaveBeenCalled()
  })
})
