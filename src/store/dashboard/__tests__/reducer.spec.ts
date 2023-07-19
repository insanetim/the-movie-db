import { fetchSearch, fetchTrending } from '../actions'
import { searchReducer, trendingReducer } from '../reducer'

describe('dashboardReducer', () => {
  describe('trendingReducer', () => {
    const initialState = {
      error: null,
      loading: true,
      movies: null
    }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(trendingReducer(initialState, action)).toEqual(initialState)
    })

    it('should handle FETCH_TRENDING/pending', () => {
      const action = {
        type: fetchTrending.pending.toString()
      }
      const expectedState = {
        error: null,
        loading: true,
        movies: null
      }

      expect(trendingReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_TRENDING/fulfilled', () => {
      const action = {
        payload: 'test/data',
        type: fetchTrending.fulfilled.toString()
      }
      const expectedState = {
        error: null,
        loading: false,
        movies: action.payload
      }

      expect(trendingReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_TRENDING/rejected', () => {
      const action = {
        payload: 'test/error',
        type: fetchTrending.rejected.toString()
      }
      const expectedState = {
        error: action.payload,
        loading: false,
        movies: null
      }

      expect(trendingReducer(initialState, action)).toEqual(expectedState)
    })
  })

  describe('searchReducer', () => {
    const initialState = {
      error: null,
      loading: true,
      movies: null
    }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(searchReducer(initialState, action)).toEqual(initialState)
    })

    it('should handle FETCH_SEARCH/pending', () => {
      const action = {
        type: fetchSearch.pending.toString()
      }
      const expectedState = {
        error: null,
        loading: true,
        movies: null
      }

      expect(searchReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_SEARCH/fulfilled', () => {
      const action = {
        payload: 'test/data',
        type: fetchSearch.fulfilled.toString()
      }
      const expectedState = {
        error: null,
        loading: false,
        movies: action.payload
      }

      expect(searchReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_SEARCH/rejected', () => {
      const action = {
        payload: 'test/error',
        type: fetchSearch.rejected.toString()
      }
      const expectedState = {
        error: action.payload,
        loading: false,
        movies: null
      }

      expect(searchReducer(initialState, action)).toEqual(expectedState)
    })
  })
})
