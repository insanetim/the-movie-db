import * as types from '../types'
import reducer from '../reducer'

describe('watchlistReducer', () => {
  const initialState = { movies: {}, page: 1, loading: true, error: null }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle FETCH_WATCHLIST_REQUEST', () => {
    const action = {
      type: types.FETCH_WATCHLIST_REQUEST,
      payload: 1
    }
    const expectedResult = { movies: {}, page: 1, loading: true, error: null }

    expect(reducer(initialState, action)).toEqual(expectedResult)
  })

  it('should handle FETCH_WATCHLIST_SUCCESS', () => {
    const action = {
      type: types.FETCH_WATCHLIST_SUCCESS,
      payload: { id: 123 }
    }
    const expectedResult = { movies: { id: 123 }, page: 1, loading: false, error: null }

    expect(reducer(initialState, action)).toEqual(expectedResult)
  })

  it('should handle FETCH_WATCHLIST_FAILURE', () => {
    const action = {
      type: types.FETCH_WATCHLIST_FAILURE,
      payload: { message: 'test/error' }
    }
    const expectedResult = { movies: {}, page: 1, loading: false, error: { message: 'test/error' } }

    expect(reducer(initialState, action)).toEqual(expectedResult)
  })

  it('should handle SET_WATCHLIST_PAGE', () => {
    const action = {
      type: types.SET_WATCHLIST_PAGE,
      payload: 3
    }
    const expectedResult = { movies: {}, page: 3, loading: true, error: null }

    expect(reducer(initialState, action)).toEqual(expectedResult)
  })
})
