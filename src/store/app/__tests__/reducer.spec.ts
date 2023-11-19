import { assoc, assocPath } from 'ramda'
import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'

import type { AppState } from '../types'

import {
  hideModal,
  hideNotification,
  showModal,
  showNotification
} from '../actions'
import appReducer from '../reducer'

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'test/id')
}))

describe('appReducer', () => {
  const initialState: AppState = {
    modal: {
      modalProps: null,
      modalType: null
    },
    notifications: []
  }

  it('should handle hideModal', () => {
    const action = {
      type: hideModal.toString()
    }
    const expectedState = assocPath(
      ['modal', 'modalProps'],
      { open: false },
      initialState
    )

    expect(appReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle hideNotification', () => {
    const action = {
      payload: { id: 'test/id' },
      type: hideNotification.toString()
    }
    const initialState = {
      modal: {
        modalProps: null,
        modalType: null
      },
      notifications: [
        {
          duration: NOTIFICATION_DURATION,
          id: 'test/id',
          messageText: 'test/message',
          messageType: NOTIFICATION_TYPE.SUCCESS
        }
      ]
    }
    const expectedState = assoc('notifications', [], initialState)

    expect(appReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle showModal', () => {
    const action = {
      payload: {
        modalProps: 'test/modalProps',
        modalType: 'test/modalType'
      },
      type: showModal.toString()
    }
    const expectedState = assoc('modal', action.payload, initialState)

    expect(appReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle showNotification', () => {
    const action = {
      payload: { messageText: 'test/message' },
      type: showNotification.toString()
    }
    const expectedState = assoc(
      'notifications',
      [
        {
          duration: NOTIFICATION_DURATION,
          id: 'test/id',
          messageText: 'test/message',
          messageType: NOTIFICATION_TYPE.SUCCESS
        }
      ],
      initialState
    )

    expect(appReducer(initialState, action)).toEqual(expectedState)
  })
})
