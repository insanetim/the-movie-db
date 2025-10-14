import { assoc, assocPath, mergeDeepRight } from 'ramda'
import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'

import {
  hideModal,
  hideNotification,
  showModal,
  showNotification,
} from '../actions'
import appReducer from '../reducer'
import { AppState } from '../types'

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => 'test/id',
}))

describe('appReducer', () => {
  const state: AppState = {
    modal: {
      modalProps: null,
      modalType: null,
    },
    notifications: [],
    theme: 'light',
  }

  it('should return initial state with empty action', () => {
    const result = appReducer(undefined, { type: '' })

    expect(result).toEqual(state)
  })

  it('should handle "hideModal" action', () => {
    const action = hideModal()
    const newState = assocPath(['modal', 'modalProps'], { open: false }, state)
    const result = appReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "hideNotification" action', () => {
    const action = hideNotification('test/id')
    const newState = assoc('notifications', [], state)
    const result = appReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "showModal" action', () => {
    const action = showModal({
      modalProps: 'test/modalProps',
      modalType: 'test/modalType',
    })
    const newState = assoc('modal', action.payload, state)
    const result = appReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "showModal" action without modalProps', () => {
    const action = showModal({ modalType: 'test/modalType' })
    const newState = mergeDeepRight(state, {
      modal: {
        modalProps: null,
        modalType: 'test/modalType',
      },
    })
    const result = appReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "showNotification" action', () => {
    const action = showNotification({ message: 'test/message' })
    const newState = assoc(
      'notifications',
      [
        {
          duration: NOTIFICATION_DURATION,
          id: 'test/id',
          message: 'test/message',
          type: NOTIFICATION_TYPE.SUCCESS,
        },
      ],
      state
    )
    const result = appReducer(state, action)

    expect(result).toEqual(newState)
  })
})
