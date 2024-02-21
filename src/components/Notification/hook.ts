import { notification } from 'antd'
import { useCallback, useEffect } from 'react'

import { NotificationHookProps, NotificationHookReturn } from './types'

const useContainer = (props: NotificationHookProps): NotificationHookReturn => {
  const { duration, hideNotification, id, messageText, messageType } = props

  const closeNotification = useCallback(() => {
    hideNotification(id)
    notification.destroy(id)
  }, [hideNotification, id])

  useEffect(() => {
    notification[messageType]({
      duration,
      key: id,
      message: messageText,
      onClose: closeNotification,
    })
  }, [closeNotification, duration, id, messageText, messageType])

  return { closeNotification }
}

export default useContainer
