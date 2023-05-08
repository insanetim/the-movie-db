import reducer from '../reducer'
import { fetchWatchlist } from '../actions'

describe('watchlistReducer', () => {
  const initialState = { movies: null, loading: true, error: null }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle FETCH_WATCHLIST/pending', () => {
    const action = {
      type: fetchWatchlist.pending.toString()
    }
    const expectedState = { movies: null, loading: true, error: null }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_WATCHLIST/fulfilled', () => {
    const action = {
      type: fetchWatchlist.fulfilled.toString(),
      payload: 'test/data'
    }
    const expectedState = { movies: 'test/data', loading: false, error: null }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_WATCHLIST/rejected', () => {
    const action = {
      type: fetchWatchlist.rejected.toString(),
      payload: 'test/error'
    }
    const expectedState = { movies: null, loading: false, error: 'test/error' }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})
