import { hideNotification as hideNotificationAction } from 'src/store/app/actions'
import { notificationsSelector } from 'src/store/app/selectors'
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
