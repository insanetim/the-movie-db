import { RootState } from '../index'

export const modalTypeSelector = (state: RootState) => {
  return state.app.modal.modalType
}
export const modalPropsSelector = (state: RootState) => {
  return state.app.modal.modalProps
}
export const notificationsSelector = (state: RootState) => {
  return state.app.notifications
}
