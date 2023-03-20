import * as actions from '../actions'
import * as types from '../types'

it('fetchWatchlist', () => {
  const expectedAction = {
    type: types.FETCH_WATCHLIST,
    payload: 1
  }

  expect(actions.fetchWatchlist()).toEqual(expectedAction)
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
    payload: { id: 123 }
  }

  expect(actions.fetchWatchlistSuccess({ id: 123 })).toEqual(expectedAction)
})

it('fetchWatchlistFailure', () => {
  const expectedAction = {
    type: types.FETCH_WATCHLIST_FAILURE,
    payload: { message: 'test/error' }
  }

  expect(actions.fetchWatchlistFailure({ message: 'test/error' })).toEqual(expectedAction)
})

it('setWatchlistPage', () => {
  const expectedAction = {
    type: types.SET_WATCHLIST_PAGE,
    payload: 3
  }

  expect(actions.setWatchlistPage(3)).toEqual(expectedAction)
})
