import type { ModalProps, ModalTypes } from 'src/components/ModalRoot/types'
import type { NOTIFICATION_TYPE } from 'src/constants/app'

export type IModal = {
  modalProps: ModalProps | null
  modalType: ModalTypes | null
}

export type INotification = {
  duration: number
  id: string
  messageText: string
  messageType: NOTIFICATION_TYPE
}

export interface AppState {
  modal: IModal
  notifications: INotification[]
}
