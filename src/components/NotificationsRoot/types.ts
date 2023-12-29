import { Notification } from 'src/store/app/types'

export type NotificationsRootHook = {
  hideNotification: (id: string) => void
  notifications: Notification[]
}
