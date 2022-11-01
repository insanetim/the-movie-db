import * as actions from '../actions'
import * as types from '../types'

it('fetchTrending', () => {
  const expectedAction = {
    type: types.FETCH_TRENDING,
    payload: {}
  }

  expect(actions.fetchTrending({})).toEqual(expectedAction)
})

it('setTrending', () => {
  const expectedAction = {
    type: types.SET_TRENDING,
    payload: {}
  }

  expect(actions.setTrending({})).toEqual(expectedAction)
})

it('fetchSearch', () => {
  const expectedAction = {
    type: types.FETCH_SEARCH,
    payload: {}
  }

  expect(actions.fetchSearch({})).toEqual(expectedAction)
})

it('setSearch', () => {
  const expectedAction = {
    type: types.SET_SEARCH,
    payload: {}
  }

  expect(actions.setSearch({})).toEqual(expectedAction)
})

it('setSearchQuery', () => {
  const expectedAction = {
    type: types.SET_SEARCH_QUERY,
    payload: {}
  }

  expect(actions.setSearchQuery({})).toEqual(expectedAction)
})

it('clearSearch', () => {
  const expectedAction = {
    type: types.CLEAR_SEARCH
  }

  expect(actions.clearSearch()).toEqual(expectedAction)
})
