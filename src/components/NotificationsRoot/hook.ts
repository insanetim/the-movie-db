import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { hideNotification as hideNotificationAction } from 'src/store/app/actions'
import { notificationsSelector } from 'src/store/app/selectors'
import type { NotificationsRootHook } from './types'

const useContainer = (): NotificationsRootHook => {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector(notificationsSelector)

  const hideNotification = (id: string) => {
    dispatch(hideNotificationAction(id))
  }

  return { notifications, hideNotification }
}

export default useContainer
