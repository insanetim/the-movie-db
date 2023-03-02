import * as types from '../types'
import * as reducer from '../reducer'

describe('appReducer', () => {
  describe('modal reducer', () => {
    const initialState = { modalType: null, modalProps: {} }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(reducer.modal(undefined, action)).toEqual(initialState)
    })

    it('should handle SHOW_MODAL', () => {
      const action = {
        type: types.SHOW_MODAL,
        payload: { modalType: 'test/modalType', modalProps: 'test/modalProps' }
      }
      const expectedState = { modalType: 'test/modalType', modalProps: 'test/modalProps' }

      expect(reducer.modal(initialState, action)).toEqual(expectedState)
    })

    it('should handle HIDE_MODAL', () => {
      const action = {
        type: types.HIDE_MODAL
      }
      const expectedState = { modalType: null, modalProps: { open: false } }

      expect(reducer.modal(initialState, action)).toEqual(expectedState)
    })
  })

  describe('notifications reducer', () => {
    const initialState = []

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(reducer.notifications(initialState, action)).toEqual(initialState)
    })

    it('should handle SHOW_NOTIFICATION', () => {
      const action = {
        type: types.SHOW_NOTIFICATION,
        payload: { id: 123, messageType: 'success', messageText: 'test/message', duration: 2.5 }
      }
      const expectedState = [{ id: 123, messageType: 'success', messageText: 'test/message', duration: 2.5 }]

      expect(reducer.notifications(initialState, action)).toEqual(expectedState)
    })

    it('should handle HIDE_NOTIFICATION', () => {
      const state = [{ id: 123 }]
      const action = { type: types.HIDE_NOTIFICATION, payload: 123 }
      const expectedState = []

      expect(reducer.notifications(state, action)).toEqual(expectedState)
    })
  })
})
