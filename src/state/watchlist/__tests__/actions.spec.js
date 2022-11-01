import * as actions from '../actions'
import * as types from '../types'

it('fetchWatchlist', () => {
  const expectedAction = {
    type: types.FETCH_WATCHLIST,
    payload: {}
  }

  expect(actions.fetchWatchlist({})).toEqual(expectedAction)
})

it('setWatchlist', () => {
  const expectedAction = {
    type: types.SET_WATCHLIST,
    payload: {}
  }

  expect(actions.setWatchlist({})).toEqual(expectedAction)
})
