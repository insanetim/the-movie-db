import * as types from '../types'
import * as reducer from '../reducer'

describe('appReducer', () => {
  describe('modal reducer', () => {
    const inintialState = { modalType: null, modalProps: {} }

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(reducer.modal(inintialState, action)).toEqual(inintialState)
    })

    it('should handle SHOW_MODAL', () => {
      const action = {
        type: types.SHOW_MODAL,
        payload: { modalType: 'test/modalType', modalProps: 'test/modalProps' }
      }
      const expectedResult = { modalType: 'test/modalType', modalProps: 'test/modalProps' }

      expect(reducer.modal(inintialState, action)).toEqual(expectedResult)
    })

    it('should handle HIDE_MODAL', () => {
      const action = {
        type: types.HIDE_MODAL
      }
      const expectedResult = { modalType: null, modalProps: { open: false } }

      expect(reducer.modal(inintialState, action)).toEqual(expectedResult)
    })
  })

  describe('notifications reducer', () => {
    const inintialState = []

    it('returns initial state', () => {
      const action = { type: 'unknown' }

      expect(reducer.notifications(inintialState, action)).toEqual(inintialState)
    })

    it('should handle SHOW_NOTIFICATION', () => {
      const action = {
        type: types.SHOW_NOTIFICATION,
        payload: { id: 123, messageType: 'success', messageText: 'test/message', duration: 2.5 }
      }
      const expectedResult = [{ id: 123, messageType: 'success', messageText: 'test/message', duration: 2.5 }]

      expect(reducer.notifications(inintialState, action)).toEqual(expectedResult)
    })

    it('should handle HIDE_NOTIFICATION', () => {
      const state = [{ id: 123 }]
      const action = { type: types.HIDE_NOTIFICATION, payload: 123 }
      const expectedResult = []

      expect(reducer.notifications(state, action)).toEqual(expectedResult)
    })
  })
})
