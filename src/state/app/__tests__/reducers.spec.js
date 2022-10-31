import * as types from '../types'
import reducer from '../reducers'

describe('appReducer', () => {
  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      modalType: null,
      modalProps: {}
    })
  })

  it('should handle LOADING_ON', () => {
    const action = {
      type: types.LOADING_ON
    }
    expect(reducer(undefined, action)).toEqual({
      loading: true,
      modalType: null,
      modalProps: {}
    })
  })

  it('should handle LOADING_OFF', () => {
    const action = {
      type: types.LOADING_OFF
    }
    expect(reducer(undefined, action)).toEqual({
      loading: false,
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
    expect(reducer(undefined, action)).toEqual({
      loading: false,
      modalType: 'test/modalType',
      modalProps: { id: 1 }
    })
  })

  it('should handle HIDE_MODAL', () => {
    const action = {
      type: types.HIDE_MODAL
    }
    expect(reducer(undefined, action)).toEqual({
      loading: false,
      modalType: null,
      modalProps: { open: false }
    })
  })
})
