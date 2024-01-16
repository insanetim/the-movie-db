import { Notification } from 'src/store/app/types'

export type NotificationsRootHookReturn = {
  hideNotification: (id: string) => void
  notifications: Notification[]
}
