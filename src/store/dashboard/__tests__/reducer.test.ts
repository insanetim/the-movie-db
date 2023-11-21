import type { DashboardState } from '../types'

import { fetchSearch, fetchTrending } from '../actions'
import dashboardReducer from '../reducer'

describe('dashboardReducer', () => {
  const state: DashboardState = { data: null }

  it('should return initial state with empty action', () => {
    const result = dashboardReducer(undefined, { type: '' })

    expect(result).toEqual(state)
  })

  it('should handle fetchTrending/pending action', () => {
    const action = { type: fetchTrending.pending }
    const result = dashboardReducer(state, action)

    expect(result).toEqual(state)
  })

  it('should handle fetchTrending/fulfilled action', () => {
    const action = {
      payload: 'test/data',
      type: fetchTrending.fulfilled
    }
    const newState = { data: action.payload }
    const result = dashboardReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle fetchSearch/pending action', () => {
    const action = { type: fetchSearch.pending }
    const result = dashboardReducer(state, action)

    expect(result).toEqual(state)
  })

  it('should handle fetchSearch/fulfilled action', () => {
    const action = {
      payload: 'test/data',
      type: fetchSearch.fulfilled
    }
    const newState = { data: action.payload }
    const result = dashboardReducer(state, action)

    expect(result).toEqual(newState)
  })
})
