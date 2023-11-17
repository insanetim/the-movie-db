import type { DashboardState } from '../types'

import { fetchSearch, fetchTrending } from '../actions'
import dashboardReducer from '../reducer'

describe('dashboardReducer', () => {
  const initialState: DashboardState = { data: null }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(dashboardReducer(initialState, action)).toEqual(initialState)
  })

  it('should handle fetchTrending/pending', () => {
    const action = {
      type: fetchTrending.pending.toString()
    }

    expect(dashboardReducer(initialState, action)).toEqual(initialState)
  })

  it('should handle fetchTrending/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchTrending.fulfilled.toString()
    }
    const expectedState = { data: action.payload }

    expect(dashboardReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle fetchSearch/pending', () => {
    const action = {
      type: fetchSearch.pending.toString()
    }

    expect(dashboardReducer(initialState, action)).toEqual(initialState)
  })

  it('should handle fetchSearch/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchSearch.fulfilled.toString()
    }
    const expectedState = { data: action.payload }

    expect(dashboardReducer(initialState, action)).toEqual(expectedState)
  })
})
