import { mergeDeepRight } from 'ramda'

import { fetchWatchlist } from '../actions'
import watchlistReducer from '../reducer'
import { WatchlistState } from '../types'

describe('watchlistReducer', () => {
  const state: WatchlistState = {
    data: null,
    error: null,
    loading: true,
  }

  it('should return initial state with empty action', () => {
    const result = watchlistReducer(undefined, { type: '' })

    expect(result).toEqual(state)
  })

  it('should handle "fetchWatchlist/pending" action', () => {
    const action = { type: fetchWatchlist.pending.type }
    const result = watchlistReducer(state, action)

    expect(result).toEqual(state)
  })

  it('should handle "fetchWatchlist/fulfilled" action', () => {
    const action = {
      payload: 'test/data',
      type: fetchWatchlist.fulfilled.type,
    }
    const newState = mergeDeepRight(state, {
      data: action.payload,
      loading: false,
    })
    const result = watchlistReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "fetchWatchlist/rejected" action', () => {
    const action = {
      payload: 'test/data',
      type: fetchWatchlist.rejected.type,
    }
    const newState = mergeDeepRight(state, {
      error: action.payload,
      loading: false,
    })
    const result = watchlistReducer(state, action)

    expect(result).toEqual(newState)
  })
})
