import { mergeDeepRight } from 'ramda'

import { fetchSearch, fetchTrending } from '../actions'
import dashboardReducer from '../reducer'
import { DashboardState } from '../types'

describe('dashboardReducer', () => {
  const state: DashboardState = {
    data: null,
    error: null,
    loading: true,
  }

  it('should return initial state with empty action', () => {
    const result = dashboardReducer(undefined, { type: '' })

    expect(result).toEqual(state)
  })

  it('should handle "fetchTrending/pending" action', () => {
    const action = { type: fetchTrending.pending.type }
    const result = dashboardReducer(state, action)

    expect(result).toEqual(state)
  })

  it('should handle "fetchTrending/fulfilled" action', () => {
    const action = {
      payload: 'test/data',
      type: fetchTrending.fulfilled.type,
    }
    const newState = mergeDeepRight(state, {
      data: action.payload,
      loading: false,
    })
    const result = dashboardReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "fetchTrending/rejected" action', () => {
    const action = {
      payload: 'test/error',
      type: fetchTrending.rejected.type,
    }
    const newState = mergeDeepRight(state, {
      error: action.payload,
      loading: false,
    })
    const result = dashboardReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "fetchSearch/pending" action', () => {
    const action = { type: fetchSearch.pending.type }
    const result = dashboardReducer(state, action)

    expect(result).toEqual(state)
  })

  it('should handle "fetchSearch/fulfilled" action', () => {
    const action = {
      payload: 'test/data',
      type: fetchSearch.fulfilled.type,
    }
    const newState = mergeDeepRight(state, {
      data: action.payload,
      loading: false,
    })
    const result = dashboardReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "fetchSearch/rejected" action', () => {
    const action = {
      payload: 'test/error',
      type: fetchSearch.rejected.type,
    }
    const newState = mergeDeepRight(state, {
      error: action.payload,
      loading: false,
    })
    const result = dashboardReducer(state, action)

    expect(result).toEqual(newState)
  })
})
