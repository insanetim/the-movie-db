import { fetchListDetail, fetchLists } from '../actions'
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

      expect(createdListsReducer(initialState, action)).toEqual(initialState)
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
        payload: 'test/data',
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

    it('should handle FETCH_LIST_DETAIL/pending', () => {
      const action = {
        type: fetchListDetail.pending.toString()
      }

      expect(listDetailReducer(initialState, action)).toEqual(initialState)
    })

    it('should handle FETCH_LIST_DETAIL/fulfilled', () => {
      const action = {
        payload: 'test/data',
        type: fetchListDetail.fulfilled.toString()
      }
      const expectedState = {
        error: null,
        list: action.payload,
        loading: false
      }

      expect(listDetailReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_LIST_DETAIL/rejected', () => {
      const action = {
        payload: 'test/data',
        type: fetchListDetail.rejected.toString()
      }
      const expectedState = {
        error: action.payload,
        list: null,
        loading: false
      }

      expect(listDetailReducer(initialState, action)).toEqual(expectedState)
    })
  })
})
