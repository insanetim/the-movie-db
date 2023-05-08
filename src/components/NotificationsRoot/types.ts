import type { INotification } from 'src/store/app/types'

export interface NotificationsRootHook {
  notifications: INotification[]
  hideNotification: (id: string) => void
}
