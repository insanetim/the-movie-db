import * as types from '../types'
import { loading, modal } from '../reducers'

describe('appReducer', () => {
  it('should handle LOADING_ON', () => {
    const action = {
      type: types.LOADING_ON
    }
    expect(loading(undefined, action)).toEqual(true)
  })

  it('should handle LOADING_OFF', () => {
    const action = {
      type: types.LOADING_OFF
    }
    expect(loading(undefined, action)).toEqual(false)
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
    expect(modal(undefined, action)).toEqual({
      modalType: 'test/modalType',
      modalProps: { id: 1 }
    })
  })

  it('should handle HIDE_MODAL', () => {
    const action = {
      type: types.HIDE_MODAL
    }
    expect(modal(undefined, action)).toEqual({
      modalType: null,
      modalProps: { open: false }
    })
  })
})
