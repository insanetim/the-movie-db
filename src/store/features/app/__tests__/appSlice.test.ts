import { assoc } from 'ramda'
import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants'

import {
  appReducer,
  hideNotification,
  selectNotification,
  selectTheme,
  selectThemeIsDark,
  showNotification,
} from '../appSlice'
import { AppState } from '../types'

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => 'test/id',
}))

describe('appSlice', () => {
  const initialState: AppState = {
    notifications: [],
    theme: 'light',
  }

  describe('reducer', () => {
    it('should return initial state with empty action', () => {
      const result = appReducer(undefined, { type: '' })

      expect(result).toEqual(initialState)
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
    it('should select notifications', () => {
      const root = { app: initialState }
      expect(selectNotification(root as never)).toEqual(
        initialState.notifications
      )
    })

    it('should select theme', () => {
      const root = { app: initialState }
      expect(selectTheme(root as never)).toEqual(initialState.theme)
    })

    it('should select theme is dark', () => {
      const root = { app: initialState }
      expect(selectThemeIsDark(root as never)).toEqual(false)
    })
  })
})
