import { fetchList, fetchLists, removeFromList } from '../actions'
import { createdListsReducer, listDetailReducer } from '../reducer'
import { IListState, IListsState } from '../types'

describe('listsReducer', () => {
  describe('createdListsReducer', () => {
    const initialState: IListsState = {
      error: null,
      lists: null,
      loading: true
    }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(createdListsReducer(initialState, action)).toEqual(initialState)
    })

    it('should handle FETCH_LISTS/pending', () => {
      const action = {
        type: fetchLists.pending.toString()
      }
      const expectedState = {
        error: null,
        lists: null,
        loading: true
      }

      expect(createdListsReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_LISTS/fulfilled', () => {
      const action = {
        payload: 'test/data',
        type: fetchLists.fulfilled.toString()
      }
      const expectedState = {
        error: null,
        lists: action.payload,
        loading: false
      }

      expect(createdListsReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_LISTS/rejected', () => {
      const action = {
        payload: 'test/error',
        type: fetchLists.rejected.toString()
      }
      const expectedState = {
        error: action.payload,
        lists: null,
        loading: false
      }

      expect(createdListsReducer(initialState, action)).toEqual(expectedState)
    })
  })

  describe('listDetailReducer', () => {
    const initialState: IListState = {
      error: null,
      list: null,
      loading: true
    }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(listDetailReducer(initialState, action)).toEqual(initialState)
    })

    it('should handle FETCH_LIST/pending', () => {
      const action = {
        type: fetchList.pending.toString()
      }
      const expectedState = {
        error: null,
        list: null,
        loading: true
      }

      expect(listDetailReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_LIST/fulfilled', () => {
      const action = {
        payload: 'test/data',
        type: fetchList.fulfilled.toString()
      }
      const expectedState = {
        error: null,
        list: action.payload,
        loading: false
      }

      expect(listDetailReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_LIST/rejected', () => {
      const action = {
        payload: 'test/error',
        type: fetchList.rejected.toString()
      }
      const expectedState = {
        error: action.payload,
        list: null,
        loading: false
      }

      expect(listDetailReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle REMOVE_FROM_LIST/fulfilled', () => {
      const action = {
        payload: 123,
        type: removeFromList.fulfilled.toString()
      }
      const initialState = {
        list: { items: [{ id: 123 }, { id: 321 }] }
      } as IListState
      const expectedState = {
        list: { items: [{ id: 321 }] }
      }

      expect(listDetailReducer(initialState, action)).toEqual(expectedState)
    })
  })
})
