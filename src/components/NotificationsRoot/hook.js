import { useDispatch, useSelector } from 'react-redux'

import { hideNotification as hideNotificationAction } from 'src/state/app/actions'
import { notificationsSelector } from 'src/state/app/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(notificationsSelector)

  const hideNotification = id => {
    dispatch(hideNotificationAction(id))
  }

  return { notifications, hideNotification }
}

export default useContainer
