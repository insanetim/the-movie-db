import * as actions from '../actions'
import * as types from '../types'

it('fetchWatchlist', () => {
  const expectedAction = {
    type: types.FETCH_WATCHLIST,
    payload: 1
  }

  expect(actions.fetchWatchlist(1)).toEqual(expectedAction)
})

it('fetchWatchlistRequest', () => {
  const expectedAction = {
    type: types.FETCH_WATCHLIST_REQUEST,
    payload: 1
  }

  expect(actions.fetchWatchlistRequest(1)).toEqual(expectedAction)
})

it('fetchWatchlistSuccess', () => {
  const expectedAction = {
    type: types.FETCH_WATCHLIST_SUCCESS,
    payload: {}
  }

  expect(actions.fetchWatchlistSuccess({})).toEqual(expectedAction)
})

it('fetchWatchlistFailure', () => {
  const expectedAction = {
    type: types.FETCH_WATCHLIST_FAILURE,
    payload: {}
  }

  expect(actions.fetchWatchlistFailure({})).toEqual(expectedAction)
})

it('setWatchlistPage', () => {
  const expectedAction = {
    type: types.SET_WATCHLIST_PAGE,
    payload: 3
  }

  expect(actions.setWatchlistPage(3)).toEqual(expectedAction)
})
