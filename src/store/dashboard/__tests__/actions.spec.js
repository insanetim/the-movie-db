import * as actions from '../actions'
import * as types from '../types'

describe('dashboard actions', () => {
  it('fetchTrending', () => {
    const expectedAction = {
      type: types.FETCH_TRENDING,
      payload: 1
    }

    expect(actions.fetchTrending(1)).toEqual(expectedAction)
  })

  it('fetchTrendingRequest', () => {
    const expectedAction = {
      type: types.FETCH_TRENDING_REQUEST,
      payload: 1
    }

    expect(actions.fetchTrendingRequest(1)).toEqual(expectedAction)
  })

  it('fetchTrendingSuccess', () => {
    const expectedAction = {
      type: types.FETCH_TRENDING_SUCCESS,
      payload: { id: 123 }
    }

    expect(actions.fetchTrendingSuccess({ id: 123 })).toEqual(expectedAction)
  })

  it('fetchTrendingFailure', () => {
    const expectedAction = {
      type: types.FETCH_TRENDING_FAILURE,
      payload: { message: 'test/error' }
    }

    expect(actions.fetchTrendingFailure({ message: 'test/error' })).toEqual(expectedAction)
  })

  it('setTrendingPage', () => {
    const expectedAction = {
      type: types.SET_TRENDING_PAGE,
      payload: 3
    }

    expect(actions.setTrendingPage(3)).toEqual(expectedAction)
  })

  it('fetchSearch', () => {
    const expectedAction = {
      type: types.FETCH_SEARCH,
      payload: { page: 1, query: 'test/search' }
    }

    expect(actions.fetchSearch({ page: 1, query: 'test/search' })).toEqual(expectedAction)
  })

  it('fetchSearchRequest', () => {
    const expectedAction = {
      type: types.FETCH_SEARCH_REQUEST,
      payload: 1
    }

    expect(actions.fetchSearchRequest(1)).toEqual(expectedAction)
  })

  it('fetchSearchSuccess', () => {
    const expectedAction = {
      type: types.FETCH_SEARCH_SUCCESS,
      payload: { id: 123 }
    }

    expect(actions.fetchSearchSuccess({ id: 123 })).toEqual(expectedAction)
  })

  it('fetchSearchFailure', () => {
    const expectedAction = {
      type: types.FETCH_SEARCH_FAILURE,
      payload: { message: 'test/error' }
    }

    expect(actions.fetchSearchFailure({ message: 'test/error' })).toEqual(expectedAction)
  })

  it('setSearchPage', () => {
    const expectedAction = {
      type: types.SET_SEARCH_PAGE,
      payload: 3
    }

    expect(actions.setSearchPage(3)).toEqual(expectedAction)
  })
})
