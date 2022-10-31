import * as actions from '../actions'
import * as types from '../types'

it('loadingOn', () => {
  const expectedAction = {
    type: types.LOADING_ON
  }

  expect(actions.loadingOn()).toEqual(expectedAction)
})

it('loadingOff', () => {
  const expectedAction = {
    type: types.LOADING_OFF
  }

  expect(actions.loadingOff()).toEqual(expectedAction)
})

it('showNotification', () => {
  const expectedAction = {
    type: types.SHOW_NOTIFICATION,
    payload: {}
  }

  expect(actions.showNotification({})).toEqual(expectedAction)
})

it('showModal', () => {
  const expectedAction = {
    type: types.SHOW_MODAL,
    payload: {}
  }

  expect(actions.showModal({})).toEqual(expectedAction)
})

it('hideModal', () => {
  const expectedAction = {
    type: types.HIDE_MODAL
  }

  expect(actions.hideModal()).toEqual(expectedAction)
})
