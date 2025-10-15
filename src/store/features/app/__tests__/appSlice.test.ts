import { assoc, assocPath, mergeDeepRight } from 'ramda'
import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'

import {
  appReducer,
  hideModal,
  hideNotification,
  modalSelector,
  notificationsSelector,
  setTheme,
  showModal,
  showNotification,
  themeSelector,
} from '../appSlice'
import { AppState } from '../types'

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => 'test/id',
}))

describe('appSlice', () => {
  const initialState: AppState = {
    modal: {
      modalProps: null,
      modalType: null,
    },
    notifications: [],
    theme: 'light',
  }

  describe('reducer', () => {
    it('should return initial state with empty action', () => {
      const result = appReducer(undefined, { type: '' })

      expect(result).toEqual(initialState)
    })

    it('should handle "hideModal" action', () => {
      const action = hideModal()
      const expected = assocPath(
        ['modal', 'modalProps'],
        { open: false },
        initialState
      )
      const result = appReducer(initialState, action)

      expect(result).toEqual(expected)
    })

    it('should handle "hideNotification" action', () => {
      const stateWithNotifications = assoc(
        'notifications',
        [
          {
            duration: NOTIFICATION_DURATION,
            id: 'test/id',
            message: 'test/message',
            type: NOTIFICATION_TYPE.SUCCESS,
          },
          {
            duration: NOTIFICATION_DURATION,
            id: 'other/id',
            message: 'other/message',
            type: NOTIFICATION_TYPE.ERROR,
          },
        ],
        initialState
      )

      const action = hideNotification('test/id')
      const expected = assoc(
        'notifications',
        [
          {
            duration: NOTIFICATION_DURATION,
            id: 'other/id',
            message: 'other/message',
            type: NOTIFICATION_TYPE.ERROR,
          },
        ],
        initialState
      )

      const result = appReducer(stateWithNotifications, action)

      expect(result).toEqual(expected)
    })

    it('should handle "setTheme" action', () => {
      const action = setTheme('dark')
      const expected = assoc('theme', action.payload, initialState)
      const result = appReducer(initialState, action)

      expect(result).toEqual(expected)
    })

    it('should handle "showModal" action', () => {
      const action = showModal({
        modalProps: 'test/modalProps' as unknown as never,
        modalType: 'test/modalType' as unknown as never,
      })
      const expected = assoc('modal', action.payload, initialState)
      const result = appReducer(initialState, action)

      expect(result).toEqual(expected)
    })

    it('should handle "showModal" action without modalProps', () => {
      const action = showModal({
        modalType: 'test/modalType' as unknown as never,
      })
      const expected = mergeDeepRight(initialState, {
        modal: {
          modalProps: null,
          modalType: 'test/modalType',
        },
      })
      const result = appReducer(initialState, action)

      expect(result).toEqual(expected)
    })

    it('should handle "showNotification" action', () => {
      const action = showNotification({ message: 'test/message' })
      const expected = assoc(
        'notifications',
        [
          {
            duration: NOTIFICATION_DURATION,
            id: 'test/id',
            message: 'test/message',
            type: NOTIFICATION_TYPE.SUCCESS,
          },
        ],
        initialState
      )
      const result = appReducer(initialState, action)

      expect(result).toEqual(expected)
    })
  })

  describe('selectors', () => {
    it('should select modal', () => {
      const root = { app: initialState }
      expect(modalSelector(root as never)).toEqual(initialState.modal)
    })

    it('should select notifications', () => {
      const root = { app: initialState }
      expect(notificationsSelector(root as never)).toEqual(
        initialState.notifications
      )
    })

    it('should select theme', () => {
      const root = { app: initialState }
      expect(themeSelector(root as never)).toEqual(initialState.theme)
    })
  })
})
