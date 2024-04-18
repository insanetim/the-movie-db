import { ComponentProps } from 'react'
import { ModalTypes, ModalsMap } from 'src/components/ModalRoot/types'
import { NOTIFICATION_TYPE } from 'src/constants/app'

export type Modal = {
  [T in ModalTypes]: {
    modalProps: ComponentProps<ModalsMap[T]> | null
    modalType: T | null
  }
}[ModalTypes]

export type Notification = {
  duration: number
  id: string
  message: string
  type: NOTIFICATION_TYPE
}

export type AppState = {
  modal: Modal
  notifications: Notification[]
}

export type ShowNotificationProps = {
  duration?: number
  message: string
  type?: NOTIFICATION_TYPE
}
