import { trendingReducer, searchReducer } from '../reducer'
import { fetchSearch, fetchTrending, setSearchPage, setTrendingPage } from '../actions'

describe('dashboardReducer', () => {
  describe('trendingReducer', () => {
    const initialState = { movies: null, page: 1, loading: true, error: null }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(trendingReducer(initialState, action)).toEqual(initialState)
    })

    it('should handle FETCH_TRENDING/pending', () => {
      const action = {
        type: fetchTrending.pending.toString(),
        meta: { arg: 1 }
      }
      const expectedState = { movies: null, page: 1, loading: true, error: null }

      expect(trendingReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_TRENDING/fulfilled', () => {
      const action = {
        type: fetchTrending.fulfilled.toString(),
        payload: 'test/data'
      }
      const expectedState = { movies: 'test/data', page: 1, loading: false, error: null }

      expect(trendingReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_TRENDING/rejected', () => {
      const action = {
        type: fetchTrending.rejected.toString(),
        payload: 'test/error'
      }
      const expectedState = { movies: null, page: 1, loading: false, error: 'test/error' }

      expect(trendingReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle SET_TRENDING_PAGE', () => {
      const action = {
        type: setTrendingPage.toString(),
        payload: 3
      }
      const expectedState = { movies: null, page: 3, loading: true, error: null }

      expect(trendingReducer(initialState, action)).toEqual(expectedState)
    })
  })

  describe('searchReducer', () => {
    const initialState = { movies: null, page: 1, loading: true, error: null }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(searchReducer(initialState, action)).toEqual(initialState)
    })

    it('should handle FETCH_SEARCH/pending', () => {
      const action = {
        type: fetchSearch.pending.toString(),
        meta: { arg: { page: 1 } }
      }
      const expectedState = { movies: null, page: 1, loading: true, error: null }

      expect(searchReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_SEARCH/fulfilled', () => {
      const action = {
        type: fetchSearch.fulfilled.toString(),
        payload: 'test/data'
      }
      const expectedState = { movies: 'test/data', page: 1, loading: false, error: null }

      expect(searchReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FETCH_SEARCH/rejected', () => {
      const action = {
        type: fetchSearch.rejected.toString(),
        payload: 'test/error'
      }
      const expectedState = { movies: null, page: 1, loading: false, error: 'test/error' }

      expect(searchReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle SET_SEARCH_PAGE', () => {
      const action = {
        type: setSearchPage.toString(),
        payload: 3
      }
      const expectedState = { movies: null, page: 3, loading: true, error: null }

      expect(searchReducer(initialState, action)).toEqual(expectedState)
    })
  })
})
