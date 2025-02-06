import { ComponentProps } from 'react'
import { ModalsMap, ModalTypes } from 'src/components/ModalRoot/types'
import { NOTIFICATION_TYPE } from 'src/constants/app'

export type AppState = {
  modal: Modal
  notifications: Notification[]
}

export type Modal = {
  [T in ModalTypes]: {
    modalProps: ComponentProps<ModalsMap[T]> | null
    modalType: null | T
  }
}[ModalTypes]

export type Notification = {
  duration: number
  id: string
  message: string
  type: NOTIFICATION_TYPE
}

export type ShowNotificationProps = {
  duration?: number
  message: string
  type?: NOTIFICATION_TYPE
}
