import { Draft } from '@reduxjs/toolkit'
import { ComponentProps } from 'react'
import { ModalsMap, ModalTypes } from 'src/components/ModalsRoot/types'
import { NOTIFICATION_TYPE } from 'src/constants'

export type AppState = {
  modal: Modal
  notifications: Notification[]
  theme: Theme
}

export type Modal = {
  [T in ModalTypes]: {
    modalProps: Draft<ComponentProps<ModalsMap[T]>> | null
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

export type Theme = 'dark' | 'light'
