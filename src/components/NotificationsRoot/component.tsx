import Notification from './Notification'
import useContainer from './hook'

const NotificationsRoot: React.FC = () => {
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

export default NotificationsRoot
