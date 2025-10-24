import { NOTIFICATION_TYPE } from 'src/constants'

export type AppState = {
  notifications: Notification[]
  theme: Theme
}

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
