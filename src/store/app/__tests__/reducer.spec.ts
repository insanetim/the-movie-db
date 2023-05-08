import type { INotification } from '../types'
import { modalReducer, notificationsReducer } from '../reducer'
import { hideModal, hideNotification, showModal, showNotification } from '../actions'
import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'

describe('appReducer', () => {
  describe('modalReducer', () => {
    const initialState = { modalType: null, modalProps: null }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(modalReducer(initialState, action)).toEqual(initialState)
    })

    it('should handle SHOW_MODAL', () => {
      const action = {
        type: showModal.toString(),
        payload: { modalType: 'test/modalType', modalProps: 'test/modalProps' }
      }
      const expectedState = action.payload

      expect(modalReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle HIDE_MODAL', () => {
      const action = {
        type: hideModal.toString()
      }
      const expectedState = { modalType: null, modalProps: { open: false } }

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
        type: showNotification.toString(),
        payload: {
          id: 'nanoid',
          messageType: NOTIFICATION_TYPE.SUCCESS,
          messageText: 'test/message',
          duration: NOTIFICATION_DURATION
        }
      }
      const expectedState = [action.payload]

      expect(notificationsReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle HIDE_NOTIFICATION', () => {
      const action = {
        type: hideNotification.toString(),
        payload: 'nanoid'
      }
      const initialState = [
        {
          id: 'nanoid',
          messageType: NOTIFICATION_TYPE.SUCCESS,
          messageText: 'test/message',
          duration: NOTIFICATION_DURATION
        }
      ]
      const expectedState: INotification[] = []

      expect(notificationsReducer(initialState, action)).toEqual(expectedState)
    })
  })
})
