import * as actions from '../actions'
import * as types from '../types'

it('fetchFavorites', () => {
  const expectedAction = {
    type: types.FETCH_FAVORITES,
    payload: {}
  }

  expect(actions.fetchFavorites({})).toEqual(expectedAction)
})

it('setFavorites', () => {
  const expectedAction = {
    type: types.SET_FAVORITES,
    payload: {}
  }

  expect(actions.setFavorites({})).toEqual(expectedAction)
})
