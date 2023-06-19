import { fetchSearch, fetchTrending, setSearchPage, setTrendingPage } from '../actions'
import { searchReducer, trendingReducer } from '../reducer'

describe('dashboardReducer', () => {
  describe('trendingReducer', () => {
    const initialState = { error: null, loading: true, movies: null, page: 1 }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(trendingReducer(initialState, action)).toEqual(initialState)
    })

    it('should handle FETCH_TRENDING/pending', () => {
      const action = {
        meta: { arg: 1 },
        type: fetchTrending.pending.toString()
      }
      const expectedState = { error: null, loading: true, movies: null, page: 1 }

      expect(trendingReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_TRENDING/fulfilled', () => {
      const action = {
        payload: 'test/data',
        type: fetchTrending.fulfilled.toString()
      }
      const expectedState = { error: null, loading: false, movies: 'test/data', page: 1 }

      expect(trendingReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_TRENDING/rejected', () => {
      const action = {
        payload: 'test/error',
        type: fetchTrending.rejected.toString()
      }
      const expectedState = { error: 'test/error', loading: false, movies: null, page: 1 }

      expect(trendingReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle SET_TRENDING_PAGE', () => {
      const action = {
        payload: 3,
        type: setTrendingPage.toString()
      }
      const expectedState = { error: null, loading: true, movies: null, page: 3 }

      expect(trendingReducer(initialState, action)).toEqual(expectedState)
    })
  })

  describe('searchReducer', () => {
    const initialState = { error: null, loading: true, movies: null, page: 1 }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(searchReducer(initialState, action)).toEqual(initialState)
    })

    it('should handle FETCH_SEARCH/pending', () => {
      const action = {
        meta: { arg: { page: 1 } },
        type: fetchSearch.pending.toString()
      }
      const expectedState = { error: null, loading: true, movies: null, page: 1 }

      expect(searchReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_SEARCH/fulfilled', () => {
      const action = {
        payload: 'test/data',
        type: fetchSearch.fulfilled.toString()
      }
      const expectedState = { error: null, loading: false, movies: 'test/data', page: 1 }

      expect(searchReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_SEARCH/rejected', () => {
      const action = {
        payload: 'test/error',
        type: fetchSearch.rejected.toString()
      }
      const expectedState = { error: 'test/error', loading: false, movies: null, page: 1 }

      expect(searchReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle SET_SEARCH_PAGE', () => {
      const action = {
        payload: 3,
        type: setSearchPage.toString()
      }
      const expectedState = { error: null, loading: true, movies: null, page: 3 }

      expect(searchReducer(initialState, action)).toEqual(expectedState)
    })
  })
})
