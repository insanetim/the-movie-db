import * as actions from '../actions'
import * as types from '../types'

it('requestFavorites', () => {
  const expectedAction = {
    type: types.REQUEST_FAVORITES,
    payload: {}
  }

  expect(actions.requestFavorites({})).toEqual(expectedAction)
})

it('setFavorites', () => {
  const expectedAction = {
    type: types.SET_FAVORITES,
    payload: {}
  }

  expect(actions.setFavorites({})).toEqual(expectedAction)
})
