import * as types from '../types'
import * as reducer from '../reducer'

describe('appReducer', () => {
  describe('loading reducer', () => {
    it('returns initial state', () => {
      expect(reducer.loading(undefined, { type: 'unknown' })).toBe(false)
    })

    it('should handle LOADING_ON', () => {
      const action = {
        type: types.LOADING_ON
      }
      expect(reducer.loading(undefined, action)).toBe(true)
    })

    it('should handle LOADING_OFF', () => {
      const action = {
        type: types.LOADING_OFF
      }
      expect(reducer.loading(undefined, action)).toBe(false)
    })
  })

  describe('modal reducer', () => {
    it('returns initial state', () => {
      expect(reducer.modal(undefined, { type: 'unknown' })).toEqual({
        modalType: null,
        modalProps: {}
      })
    })

    it('should handle SHOW_MODAL', () => {
      const action = {
        type: types.SHOW_MODAL,
        payload: {
          modalType: 'test/modalType',
          modalProps: {
            id: 1
          }
        }
      }
      expect(reducer.modal(undefined, action)).toEqual({
        modalType: 'test/modalType',
        modalProps: { id: 1 }
      })
    })

    it('should handle HIDE_MODAL', () => {
      const action = {
        type: types.HIDE_MODAL
      }
      expect(reducer.modal(undefined, action)).toEqual({
        modalType: null,
        modalProps: { open: false }
      })
    })
  })

  describe('notifications reducer', () => {
    it('returns initial state', () => {
      expect(reducer.notifications(undefined, { type: 'unknown' })).toEqual([])
    })

    it('should handle SHOW_NOTIFICATION', () => {
      const action = {
        type: types.SHOW_NOTIFICATION,
        payload: {
          id: 123,
          messageType: 'success',
          messageText: 'test/message',
          duration: 2.5
        }
      }
      expect(reducer.notifications(undefined, action)).toEqual([
        {
          id: 123,
          messageType: 'success',
          messageText: 'test/message',
          duration: 2.5
        }
      ])
    })

    it('should handle HIDE_NOTIFICATION', () => {
      const action = {
        type: types.HIDE_NOTIFICATION,
        payload: 123
      }
      expect(reducer.notifications([{ id: 123 }], action)).toEqual([])
    })
  })
})
