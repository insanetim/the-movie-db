import {
  hideNotification as hideNotificationAction,
  notificationsSelector,
} from 'src/store/features/app'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'

import { NotificationsRootHookReturn } from './types'

const useContainer = (): NotificationsRootHookReturn => {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector(notificationsSelector)

  const hideNotification = (id: string) => {
    dispatch(hideNotificationAction(id))
  }

  return { hideNotification, notifications }
}

export default useContainer
