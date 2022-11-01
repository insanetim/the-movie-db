import * as actions from '../actions'
import * as types from '../types'

const cb = jest.fn()

it('login', () => {
  const expectedAction = {
    type: types.LOG_IN,
    payload: {},
    cb
  }

  expect(actions.login({}, cb)).toEqual(expectedAction)
})

it('logout', () => {
  const expectedAction = {
    type: types.LOG_OUT,
    cb
  }

  expect(actions.logout(cb)).toEqual(expectedAction)
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

it('requestAccount', () => {
  const expectedAction = {
    type: types.REQUEST_ACCOUNT
  }

  expect(actions.requestAccount()).toEqual(expectedAction)
})

it('setAccount', () => {
  const expectedAction = {
    type: types.SET_ACCOUNT,
    payload: {}
  }

  expect(actions.setAccount({})).toEqual(expectedAction)
})
