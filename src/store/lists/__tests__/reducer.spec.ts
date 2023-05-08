import { createdListsReducer, listDetailReducer } from '../reducer'
import { fetchList, fetchLists, removeFromList } from '../actions'

describe('listsReducer', () => {
  describe('createdListsReducer', () => {
    const initialState = { lists: null, loading: true, error: null }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(createdListsReducer(initialState, action)).toEqual(initialState)
    })

    it('should handle FETCH_LISTS/pending', () => {
      const action = {
        type: fetchLists.pending.toString()
      }
      const expectedState = { lists: null, loading: true, error: null }

      expect(createdListsReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_LISTS/fulfilled', () => {
      const action = {
        type: fetchLists.fulfilled.toString(),
        payload: 'test/data'
      }
      const expectedState = { lists: 'test/data', loading: false, error: null }

      expect(createdListsReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_LISTS/rejected', () => {
      const action = {
        type: fetchLists.rejected.toString(),
        payload: 'test/error'
      }
      const expectedState = { lists: null, loading: false, error: 'test/error' }

      expect(createdListsReducer(initialState, action)).toEqual(expectedState)
    })
  })

  describe('listDetailReducer', () => {
    const initialState = { list: null, loading: true, error: null }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(listDetailReducer(initialState, action)).toEqual(initialState)
    })

    it('should handle FETCH_LIST/pending', () => {
      const action = {
        type: fetchList.pending.toString()
      }
      const expectedState = { list: null, loading: true, error: null }

      expect(listDetailReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_LIST/fulfilled', () => {
      const action = {
        type: fetchList.fulfilled.toString(),
        payload: 'test/data'
      }
      const expectedState = { list: 'test/data', loading: false, error: null }

      expect(listDetailReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_LIST/rejected', () => {
      const action = {
        type: fetchList.rejected.toString(),
        payload: 'test/error'
      }
      const expectedState = { list: null, loading: false, error: 'test/error' }

      expect(listDetailReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle REMOVE_FROM_LIST/fulfilled', () => {
      const action = {
        type: removeFromList.fulfilled.toString(),
        payload: 123
      }
      const initialState = { list: { items: [{ id: 123 }, { id: 321 }] } } as never
      const expectedState = { list: { items: [{ id: 321 }] } }

      expect(listDetailReducer(initialState, action)).toEqual(expectedState)
    })
  })
})
