import * as actions from '../actions'
import * as types from '../types'

const cb = jest.fn()

it('logIn', () => {
  const expectedAction = {
    type: types.LOG_IN,
    payload: {},
    cb
  }

  expect(actions.logIn({}, cb)).toEqual(expectedAction)
})

it('logOut', () => {
  const expectedAction = {
    type: types.LOG_OUT,
    cb
  }

  expect(actions.logOut(cb)).toEqual(expectedAction)
})

it('setSession', () => {
  const expectedAction = {
    type: types.SET_SESSION,
    payload: {}
  }

  expect(actions.setSession({})).toEqual(expectedAction)
})

it('deleteSession', () => {
  const expectedAction = {
    type: types.DELETE_SESSION
  }

  expect(actions.deleteSession()).toEqual(expectedAction)
})

it('fetchAccount', () => {
  const expectedAction = {
    type: types.FETCH_ACCOUNT
  }

  expect(actions.fetchAccount()).toEqual(expectedAction)
})

it('setAccount', () => {
  const expectedAction = {
    type: types.SET_ACCOUNT,
    payload: {}
  }

  expect(actions.setAccount({})).toEqual(expectedAction)
})
