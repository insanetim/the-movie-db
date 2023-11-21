import { assoc, assocPath, mergeDeepRight } from 'ramda'
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
  const state: AppState = {
    modal: {
      modalProps: null,
      modalType: null
    },
    notifications: []
  }

  it('should return initial state with empty action', () => {
    const result = appReducer(undefined, { type: '' })

    expect(result).toEqual(state)
  })

  it('should handle hideModal action', () => {
    const action = { type: hideModal }
    const newState = assocPath(['modal', 'modalProps'], { open: false }, state)
    const result = appReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle hideNotification action', () => {
    const action = {
      payload: 'test/id',
      type: hideNotification
    }
    const state = {
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
    const newState = assoc('notifications', [], state)
    const result = appReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle showModal action', () => {
    const action = {
      payload: {
        modalProps: 'test/modalProps',
        modalType: 'test/modalType'
      },
      type: showModal
    }
    const newState = assoc('modal', action.payload, state)
    const result = appReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle showModal action without modalProps', () => {
    const action = {
      payload: {
        modalType: 'test/modalType'
      },
      type: showModal
    }
    const newState = mergeDeepRight(state, {
      modal: {
        modalProps: null,
        modalType: 'test/modalType'
      }
    })
    const result = appReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle showNotification action', () => {
    const action = {
      payload: { messageText: 'test/message' },
      type: showNotification
    }
    const newState = assoc(
      'notifications',
      [
        {
          duration: NOTIFICATION_DURATION,
          id: 'test/id',
          messageText: 'test/message',
          messageType: NOTIFICATION_TYPE.SUCCESS
        }
      ],
      state
    )
    const result = appReducer(state, action)

    expect(result).toEqual(newState)
  })
})
