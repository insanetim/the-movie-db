import { INotification } from 'src/store/app/types'

export interface NotificationsRootHook {
  hideNotification: (id: string) => void
  notifications: INotification[]
}
