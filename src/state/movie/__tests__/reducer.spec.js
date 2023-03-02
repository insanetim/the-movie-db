import * as types from '../types'
import reducer from '../reducer'

describe('movieReducer', () => {
  const initialState = { movie: {}, loading: true, error: null }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(reducer(undefined, action)).toEqual(initialState)
  })

  it('should handle FETCH_MOVIE_REQUEST', () => {
    const action = {
      type: types.FETCH_MOVIE_REQUEST
    }
    const expectedState = { movie: {}, loading: true, error: null }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_MOVIE_REQUEST', () => {
    const action = {
      type: types.FETCH_MOVIE_SUCCESS,
      payload: { id: 123 }
    }
    const expectedState = { movie: { id: 123 }, loading: false, error: null }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_MOVIE_FAILURE', () => {
    const action = {
      type: types.FETCH_MOVIE_FAILURE,
      payload: { message: 'test/error' }
    }
    const expectedState = { movie: {}, loading: false, error: { message: 'test/error' } }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle UPDATE_MOVIE_STATES', () => {
    const action = {
      type: types.UPDATE_MOVIE_STATES,
      payload: { favorite: true, watchlist: true }
    }
    const expectedState = {
      movie: { accountStates: { favorite: true, watchlist: true } },
      loading: true,
      error: null
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})
