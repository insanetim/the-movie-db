import type { NotificationProps } from './types'

import useContainer from './hook'

const Notification: React.FC<NotificationProps> = props => {
  useContainer(props)

  return null
}

export default Notification
