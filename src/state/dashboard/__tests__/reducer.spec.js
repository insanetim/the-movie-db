import * as types from '../types'
import * as reducer from '../reducer'

describe('dashboardReducer', () => {
  describe('trending reducer', () => {
    const initalState = { movies: {}, page: 1, loading: true, error: null }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(reducer.trending(initalState, action)).toEqual(initalState)
    })

    it('should handle FETCH_TRENDING_REQUEST', () => {
      const action = {
        type: types.FETCH_TRENDING_REQUEST,
        payload: 1
      }
      const expectedResult = { movies: {}, page: 1, loading: true, error: null }

      expect(reducer.trending(initalState, action)).toEqual(expectedResult)
    })

    it('should handle FETCH_TRENDING_SUCCESS', () => {
      const action = {
        type: types.FETCH_TRENDING_SUCCESS,
        payload: { id: 123 }
      }
      const expectedResult = { movies: { id: 123 }, page: 1, loading: false, error: null }

      expect(reducer.trending(initalState, action)).toEqual(expectedResult)
    })

    it('should handle FETCH_TRENDING_FAILURE', () => {
      const action = {
        type: types.FETCH_TRENDING_FAILURE,
        payload: { message: 'test/error' }
      }
      const expectedResult = { movies: {}, page: 1, loading: false, error: { message: 'test/error' } }

      expect(reducer.trending(initalState, action)).toEqual(expectedResult)
    })

    it('should handle SET_TRENDING_PAGE', () => {
      const action = {
        type: types.SET_TRENDING_PAGE,
        payload: 3
      }
      const expectedResult = { movies: {}, page: 3, loading: true, error: null }

      expect(reducer.trending(initalState, action)).toEqual(expectedResult)
    })
  })

  describe('search reducer', () => {
    const initalState = { movies: {}, page: 1, loading: true, error: null }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(reducer.search(initalState, action)).toEqual(initalState)
    })

    it('should handle FETCH_SEARCH_REQUEST', () => {
      const action = {
        type: types.FETCH_SEARCH_REQUEST,
        payload: 1
      }
      const expectedResult = { movies: {}, page: 1, loading: true, error: null }

      expect(reducer.search(initalState, action)).toEqual(expectedResult)
    })

    it('should handle FETCH_SEARCH_SUCCESS', () => {
      const action = {
        type: types.FETCH_SEARCH_SUCCESS,
        payload: { id: 123 }
      }
      const expectedResult = { movies: { id: 123 }, page: 1, loading: false, error: null }

      expect(reducer.search(initalState, action)).toEqual(expectedResult)
    })

    it('should handle FETCH_SEARCH_FAILURE', () => {
      const action = {
        type: types.FETCH_SEARCH_FAILURE,
        payload: { message: 'test/error' }
      }
      const expectedResult = { movies: {}, page: 1, loading: false, error: { message: 'test/error' } }

      expect(reducer.search(initalState, action)).toEqual(expectedResult)
    })

    it('should handle SET_SEARCH_PAGE', () => {
      const action = {
        type: types.SET_SEARCH_PAGE,
        payload: 3
      }
      const expectedResult = { movies: {}, page: 3, loading: true, error: null }

      expect(reducer.search(initalState, action)).toEqual(expectedResult)
    })
  })
})
