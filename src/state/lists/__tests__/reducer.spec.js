import * as types from '../types'
import * as reducer from '../reducer'

describe('listsReducer', () => {
  describe('lists reducer', () => {
    const initialState = { lists: {}, page: 1, loading: true, error: null }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(reducer.lists(undefined, action)).toEqual(initialState)
    })

    it('should handle FETCH_LISTS_REQUEST', () => {
      const action = {
        type: types.FETCH_LISTS_REQUEST,
        payload: 1
      }
      const expectedState = { lists: {}, page: 1, loading: true, error: null }

      expect(reducer.lists(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_LISTS_SUCCESS', () => {
      const action = {
        type: types.FETCH_LISTS_SUCCESS,
        payload: { id: 123 }
      }
      const expectedState = { lists: { id: 123 }, page: 1, loading: false, error: null }

      expect(reducer.lists(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_LISTS_FAILURE', () => {
      const action = {
        type: types.FETCH_LISTS_FAILURE,
        payload: { message: 'test/error' }
      }
      const expectedState = { lists: {}, page: 1, loading: false, error: { message: 'test/error' } }

      expect(reducer.lists(initialState, action)).toEqual(expectedState)
    })

    it('should handle SET_LISTS_PAGE', () => {
      const action = {
        type: types.SET_LISTS_PAGE,
        payload: 3
      }
      const expectedState = { lists: {}, page: 3, loading: true, error: null }

      expect(reducer.lists(initialState, action)).toEqual(expectedState)
    })
  })

  describe('list reducer', () => {
    const initialState = { list: {}, loading: true, error: null }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(reducer.list(undefined, action)).toEqual(initialState)
    })

    it('should handle FETCH_LIST_REQUEST', () => {
      const action = {
        type: types.FETCH_LIST_REQUEST
      }
      const expectedState = { list: {}, loading: true, error: null }

      expect(reducer.list(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_LIST_SUCCESS', () => {
      const action = {
        type: types.FETCH_LIST_SUCCESS,
        payload: { id: 123 }
      }
      const expectedState = { list: { id: 123 }, loading: false, error: null }

      expect(reducer.list(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_LIST_FAILURE', () => {
      const action = {
        type: types.FETCH_LIST_FAILURE,
        payload: { message: 'test/error' }
      }
      const expectedState = { list: {}, loading: false, error: { message: 'test/error' } }

      expect(reducer.list(initialState, action)).toEqual(expectedState)
    })
  })
})
