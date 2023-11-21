import useContainer from './hook'
import { NotificationProps } from './types'

const Notification: React.FC<NotificationProps> = props => {
  useContainer(props)

  return null
}

export default Notification
