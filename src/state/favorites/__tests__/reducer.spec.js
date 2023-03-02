import * as types from '../types'
import reducer from '../reducer'

describe('favoritesReducer', () => {
  const initialState = { movies: {}, page: 1, loading: true, error: null }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle FETCH_FAVORITES_REQUEST', () => {
    const action = {
      type: types.FETCH_FAVORITES_REQUEST,
      payload: 1
    }
    const expectedResult = { movies: {}, page: 1, loading: true, error: null }

    expect(reducer(initialState, action)).toEqual(expectedResult)
  })

  it('should handle FETCH_FAVORITES_SUCCESS', () => {
    const action = {
      type: types.FETCH_FAVORITES_SUCCESS,
      payload: { id: 123 }
    }
    const expectedResult = { movies: { id: 123 }, page: 1, loading: false, error: null }

    expect(reducer(initialState, action)).toEqual(expectedResult)
  })

  it('should handle FETCH_FAVORITES_FAILURE', () => {
    const action = {
      type: types.FETCH_FAVORITES_FAILURE,
      payload: { message: 'test/error' }
    }
    const expectedResult = { movies: {}, page: 1, loading: false, error: { message: 'test/error' } }

    expect(reducer(initialState, action)).toEqual(expectedResult)
  })

  it('should handle SET_FAVORITES_PAGE', () => {
    const action = {
      type: types.SET_FAVORITES_PAGE,
      payload: 3
    }
    const expectedResult = { movies: {}, page: 3, loading: true, error: null }

    expect(reducer(initialState, action)).toEqual(expectedResult)
  })
})
