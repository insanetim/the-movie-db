import * as actions from '../actions'
import * as types from '../types'

it('requestWatchlist', () => {
  const expectedAction = {
    type: types.REQUEST_WATCHLIST,
    payload: {}
  }

  expect(actions.requestWatchlist({})).toEqual(expectedAction)
})

it('setWatchlist', () => {
  const expectedAction = {
    type: types.SET_WATCHLIST,
    payload: {}
  }

  expect(actions.setWatchlist({})).toEqual(expectedAction)
})
