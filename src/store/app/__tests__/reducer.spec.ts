import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'

import type { IModalState, INotification } from '../types'

import { hideModal, hideNotification, showModal, showNotification } from '../actions'
import { modalReducer, notificationsReducer } from '../reducer'

describe('appReducer', () => {
  describe('modalReducer', () => {
    const initialState: IModalState = {
      modalProps: null,
      modalType: null
    }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(modalReducer(initialState, action)).toEqual(initialState)
    })

    it('should handle SHOW_MODAL', () => {
      const action = {
        payload: {
          modalProps: 'test/modalProps',
          modalType: 'test/modalType'
        },
        type: showModal.toString()
      }
      const expectedState = action.payload

      expect(modalReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle HIDE_MODAL', () => {
      const action = {
        type: hideModal.toString()
      }
      const expectedState = {
        modalProps: { open: false },
        modalType: null
      }

      expect(modalReducer(initialState, action)).toEqual(expectedState)
    })
  })

  describe('notificationsReducer', () => {
    const initialState: INotification[] = []

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(notificationsReducer(initialState, action)).toEqual(initialState)
    })

    it('should handle SHOW_NOTIFICATION', () => {
      const action = {
        payload: {
          duration: NOTIFICATION_DURATION,
          id: 'nanoid',
          messageText: 'test/message',
          messageType: NOTIFICATION_TYPE.SUCCESS
        },
        type: showNotification.toString()
      }
      const expectedState = [action.payload]

      expect(notificationsReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle HIDE_NOTIFICATION', () => {
      const action = {
        payload: 'nanoid',
        type: hideNotification.toString()
      }
      const initialState = [
        {
          duration: NOTIFICATION_DURATION,
          id: 'nanoid',
          messageText: 'test/message',
          messageType: NOTIFICATION_TYPE.SUCCESS
        }
      ]
      const expectedState: INotification[] = []

      expect(notificationsReducer(initialState, action)).toEqual(expectedState)
    })
  })
})
