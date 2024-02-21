import { NOTIFICATION_TYPE } from 'src/constants/app'

export type NotificationProps = {
  duration: number
  hideNotification: (id: string) => void
  id: string
  messageText: string
  messageType: NOTIFICATION_TYPE
}

export type NotificationHookProps = NotificationProps

export type NotificationHookReturn = {
  closeNotification: () => void
}
