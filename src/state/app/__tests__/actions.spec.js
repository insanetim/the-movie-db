import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants'
import * as actions from '../actions'
import * as types from '../types'

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4')
}))

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

it('showNotification', () => {
  const expectedAction = {
    type: types.SHOW_NOTIFICATION,
    payload: {
      id: 'uuid/v4',
      messageType: NOTIFICATION_TYPE.SUCCESS,
      messageText: 'test/message',
      duration: NOTIFICATION_DURATION
    }
  }

  expect(actions.showNotification({ messageText: 'test/message' })).toEqual(expectedAction)
})

it('hideNotification', () => {
  const expectedAction = {
    type: types.HIDE_NOTIFICATION,
    payload: 123
  }

  expect(actions.hideNotification(123)).toEqual(expectedAction)
})
