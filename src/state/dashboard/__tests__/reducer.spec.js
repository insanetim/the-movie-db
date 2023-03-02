import * as types from '../types'
import * as reducer from '../reducer'

describe('dashboardReducer', () => {
  describe('trending reducer', () => {
    const initialState = { movies: {}, page: 1, loading: true, error: null }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(reducer.trending(undefined, action)).toEqual(initialState)
    })

    it('should handle FETCH_TRENDING_REQUEST', () => {
      const action = {
        type: types.FETCH_TRENDING_REQUEST,
        payload: 1
      }
      const expectedState = { movies: {}, page: 1, loading: true, error: null }

      expect(reducer.trending(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_TRENDING_SUCCESS', () => {
      const action = {
        type: types.FETCH_TRENDING_SUCCESS,
        payload: { id: 123 }
      }
      const expectedState = { movies: { id: 123 }, page: 1, loading: false, error: null }

      expect(reducer.trending(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_TRENDING_FAILURE', () => {
      const action = {
        type: types.FETCH_TRENDING_FAILURE,
        payload: { message: 'test/error' }
      }
      const expectedState = { movies: {}, page: 1, loading: false, error: { message: 'test/error' } }

      expect(reducer.trending(initialState, action)).toEqual(expectedState)
    })

    it('should handle SET_TRENDING_PAGE', () => {
      const action = {
        type: types.SET_TRENDING_PAGE,
        payload: 3
      }
      const expectedState = { movies: {}, page: 3, loading: true, error: null }

      expect(reducer.trending(initialState, action)).toEqual(expectedState)
    })
  })

  describe('search reducer', () => {
    const initialState = { movies: {}, page: 1, loading: true, error: null }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(reducer.search(undefined, action)).toEqual(initialState)
    })

    it('should handle FETCH_SEARCH_REQUEST', () => {
      const action = {
        type: types.FETCH_SEARCH_REQUEST,
        payload: 1
      }
      const expectedState = { movies: {}, page: 1, loading: true, error: null }

      expect(reducer.search(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_SEARCH_SUCCESS', () => {
      const action = {
        type: types.FETCH_SEARCH_SUCCESS,
        payload: { id: 123 }
      }
      const expectedState = { movies: { id: 123 }, page: 1, loading: false, error: null }

      expect(reducer.search(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_SEARCH_FAILURE', () => {
      const action = {
        type: types.FETCH_SEARCH_FAILURE,
        payload: { message: 'test/error' }
      }
      const expectedState = { movies: {}, page: 1, loading: false, error: { message: 'test/error' } }

      expect(reducer.search(initialState, action)).toEqual(expectedState)
    })

    it('should handle SET_SEARCH_PAGE', () => {
      const action = {
        type: types.SET_SEARCH_PAGE,
        payload: 3
      }
      const expectedState = { movies: {}, page: 3, loading: true, error: null }

      expect(reducer.search(initialState, action)).toEqual(expectedState)
    })
  })
})
