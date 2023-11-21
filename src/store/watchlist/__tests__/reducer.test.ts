import setState from 'src/utils/stateHelpers/setState'

import type { WatchlistState } from '../types'

import { fetchWatchlist } from '../actions'
import watchlistReducer from '../reducer'

jest.mock('src/utils/stateHelpers/setState')

describe('watchlistReducer', () => {
  const state: WatchlistState = {
    data: null,
    error: null,
    loading: true
  }

  it('should return initial state with empty action', () => {
    const result = watchlistReducer(undefined, { type: '' })

    expect(result).toEqual(state)
  })

  it('should handle fetchWatchlist/pending action', () => {
    const action = { type: fetchWatchlist.pending }
    watchlistReducer(state, action)

    expect(setState.pending).toHaveBeenCalled()
  })

  it('should handle fetchWatchlist/fulfilled action', () => {
    const action = {
      payload: 'test/data',
      type: fetchWatchlist.fulfilled
    }
    watchlistReducer(state, action)

    expect(setState.fulfilled).toHaveBeenCalled()
  })

  it('should handle fetchWatchlist/rejected action', () => {
    const action = {
      payload: 'test/data',
      type: fetchWatchlist.rejected
    }
    watchlistReducer(state, action)

    expect(setState.rejected).toHaveBeenCalled()
  })
})
