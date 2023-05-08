import { useCallback, useEffect } from 'react'
import { notification } from 'antd'

import type { NotificationHook, NotificationProps } from './types'

const useContainer = (props: NotificationProps): NotificationHook => {
  const { id, messageType, messageText, duration, hideNotification } = props

  const closeNotification = useCallback(() => {
    hideNotification(id)
    notification.destroy(id)
  }, [hideNotification, id])

  useEffect(() => {
    notification[messageType]({
      key: id,
      message: messageText,
      duration,
      onClose: closeNotification
    })
  }, [closeNotification, duration, id, messageText, messageType])

  return { closeNotification }
}

export default useContainer
