import { useSelector } from 'react-redux'
import { useAppDispatch } from 'src/hooks/useRedux'
import { hideNotification as hideNotificationAction } from 'src/store/app/actions'
import { notificationsSelector } from 'src/store/app/selectors'

import { NotificationsRootHookReturn } from './types'

const useContainer = (): NotificationsRootHookReturn => {
  const dispatch = useAppDispatch()
  const notifications = useSelector(notificationsSelector)

  const hideNotification = (id: string) => {
    dispatch(hideNotificationAction(id))
  }

  return { hideNotification, notifications }
}

export default useContainer
