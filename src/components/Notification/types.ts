import { NOTIFICATION_TYPE } from 'src/constants'

export type NotificationHookProps = NotificationProps

export type NotificationHookReturn = {
  onClose: () => void
}

export type NotificationProps = {
  duration: number
  hideNotification: (id: string) => void
  id: string
  message: string
  type: NOTIFICATION_TYPE
}
