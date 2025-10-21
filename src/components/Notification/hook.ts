import { notification } from 'antd'
import { useCallback, useEffect } from 'react'

import { NotificationHookProps, NotificationHookReturn } from './types'

const useContainer = ({
  duration,
  hideNotification,
  id,
  message,
  type,
}: NotificationHookProps): NotificationHookReturn => {
  const onClose = useCallback(() => {
    hideNotification(id)
    notification.destroy(id)
  }, [id, hideNotification])

  useEffect(() => {
    notification[type]({
      duration,
      key: id,
      message,
      onClose,
    })

    // Clean up the notification when the component unmounts
    return () => {
      notification.destroy(id)
    }
  }, [onClose, duration, id, message, type])

  return { onClose }
}

export default useContainer
