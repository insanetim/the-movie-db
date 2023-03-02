import * as actions from '../actions'
import * as types from '../types'

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
    payload: {}
  }

  expect(actions.fetchTrendingSuccess({})).toEqual(expectedAction)
})

it('fetchTrendingFailure', () => {
  const expectedAction = {
    type: types.FETCH_TRENDING_FAILURE,
    payload: {}
  }

  expect(actions.fetchTrendingFailure({})).toEqual(expectedAction)
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
    payload: {}
  }

  expect(actions.fetchSearchSuccess({})).toEqual(expectedAction)
})

it('fetchSearchFailure', () => {
  const expectedAction = {
    type: types.FETCH_SEARCH_FAILURE,
    payload: {}
  }

  expect(actions.fetchSearchFailure({})).toEqual(expectedAction)
})

it('setSearchPage', () => {
  const expectedAction = {
    type: types.SET_SEARCH_PAGE,
    payload: 3
  }

  expect(actions.setSearchPage(3)).toEqual(expectedAction)
})
