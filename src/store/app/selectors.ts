import { RootState } from '../index'

const modalTypeSelector = (state: RootState) => {
  return state.app.modal.modalType
}

const modalPropsSelector = (state: RootState) => {
  return state.app.modal.modalProps
}

const notificationsSelector = (state: RootState) => {
  return state.app.notifications
}

export { modalPropsSelector, modalTypeSelector, notificationsSelector }
