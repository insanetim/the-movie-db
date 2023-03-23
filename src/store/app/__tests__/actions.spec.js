import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants'
import * as actions from '../actions'
import * as types from '../types'

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4')
}))

describe('app actions', () => {
  it('showModal', () => {
    const expectedAction = {
      type: types.SHOW_MODAL,
      payload: {
        modalType: 'test/modalType',
        modalProps: 'test/modalProps'
      }
    }

    expect(
      actions.showModal({
        modalType: 'test/modalType',
        modalProps: 'test/modalProps'
      })
    ).toEqual(expectedAction)
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
})
