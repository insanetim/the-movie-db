import * as actions from '../actions'
import * as types from '../types'

it('fetchFavorites', () => {
  const expectedAction = {
    type: types.FETCH_FAVORITES,
    payload: 1
  }

  expect(actions.fetchFavorites(1)).toEqual(expectedAction)
})

it('fetchFavoritesRequest', () => {
  const expectedAction = {
    type: types.FETCH_FAVORITES_REQUEST,
    payload: 1
  }

  expect(actions.fetchFavoritesRequest(1)).toEqual(expectedAction)
})

it('fetchFavoritesSuccess', () => {
  const expectedAction = {
    type: types.FETCH_FAVORITES_SUCCESS,
    payload: {}
  }

  expect(actions.fetchFavoritesSuccess({})).toEqual(expectedAction)
})

it('fetchFavoritesFailure', () => {
  const expectedAction = {
    type: types.FETCH_FAVORITES_FAILURE,
    payload: {}
  }

  expect(actions.fetchFavoritesFailure({})).toEqual(expectedAction)
})

it('setFavoritesPage', () => {
  const expectedAction = {
    type: types.SET_FAVORITES_PAGE,
    payload: 3
  }

  expect(actions.setFavoritesPage(3)).toEqual(expectedAction)
})
