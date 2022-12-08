import Notification from './Notification'
import useContainer from './hook'

export default function NotificationsRoot() {
  const { notifications, hideNotification } = useContainer()

  return (
    <>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          {...notification}
          hideNotification={hideNotification}
        />
      ))}
    </>
  )
}
