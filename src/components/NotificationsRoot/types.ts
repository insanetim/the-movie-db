import { Notification } from 'src/store/features/app'

export type NotificationsRootHookReturn = {
  hideNotification: (id: string) => void
  notifications: Notification[]
}
