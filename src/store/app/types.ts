import type { NOTIFICATION_TYPE } from 'src/constants/app'
import type { ModalProps, ModalTypes } from 'src/components/ModalRoot/types'

export interface IModalState {
  modalType: ModalTypes | null
  modalProps: ModalProps | null
}

export interface INotification {
  id: string
  messageType: NOTIFICATION_TYPE
  messageText: string
  duration: number
}

export interface ShowModalProps {
  modalType: ModalTypes
  modalProps?: ModalProps
}

export interface ShowNotificationProps {
  messageType?: NOTIFICATION_TYPE
  messageText: string
  duration?: number
}
