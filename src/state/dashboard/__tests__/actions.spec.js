import * as actions from '../actions'
import * as types from '../types'

it('requestTrending', () => {
  const expectedAction = {
    type: types.REQUEST_TRENDING,
    payload: {}
  }

  expect(actions.requestTrending({})).toEqual(expectedAction)
})

it('setTrending', () => {
  const expectedAction = {
    type: types.SET_TRENDING,
    payload: {}
  }

  expect(actions.setTrending({})).toEqual(expectedAction)
})

it('requestSearch', () => {
  const expectedAction = {
    type: types.REQUEST_SEARCH,
    payload: {}
  }

  expect(actions.requestSearch({})).toEqual(expectedAction)
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
