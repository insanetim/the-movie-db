import { NOTIFICATION_TYPE } from 'src/constants/app'

export interface NotificationProps {
  id: string
  messageType: NOTIFICATION_TYPE
  messageText: string
  duration: number
  hideNotification: (id: string) => void
}

export interface NotificationHook {
  closeNotification: () => void
}
