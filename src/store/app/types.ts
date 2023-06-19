import type { ModalProps, ModalTypes } from 'src/components/ModalRoot/types'
import type { NOTIFICATION_TYPE } from 'src/constants/app'

export interface IModalState {
  modalProps: ModalProps | null
  modalType: ModalTypes | null
}

export interface INotification {
  duration: number
  id: string
  messageText: string
  messageType: NOTIFICATION_TYPE
}

export interface ShowModalProps {
  modalProps?: ModalProps
  modalType: ModalTypes
}

export interface ShowNotificationProps {
  duration?: number
  messageText: string
  messageType?: NOTIFICATION_TYPE
}
