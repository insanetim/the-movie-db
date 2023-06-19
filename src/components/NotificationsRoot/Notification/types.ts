import { NOTIFICATION_TYPE } from 'src/constants/app'

export interface NotificationProps {
  duration: number
  hideNotification: (id: string) => void
  id: string
  messageText: string
  messageType: NOTIFICATION_TYPE
}

export interface NotificationHook {
  closeNotification: () => void
}
