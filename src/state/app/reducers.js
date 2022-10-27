import * as types from './types'

const initialState = {
  loading: false,
  modalType: null,
  modalProps: {}
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOADING_ON:
      return { ...state, loading: true }
    case types.LOADING_OFF:
      return { ...state, loading: false }
    case types.SHOW_MODAL:
      return { ...state, modalType: action.payload.modalType, modalProps: action.payload.modalProps }
    case types.HIDE_MODAL:
      return { ...state, modalProps: { open: false } }
    default:
      return state
  }
}
