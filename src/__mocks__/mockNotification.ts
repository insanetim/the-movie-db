import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants'
import { Notification } from 'src/store/features/app'

const mockNotification: Notification = {
  duration: NOTIFICATION_DURATION,
  id: 'test/id',
  message: 'test/message',
  type: NOTIFICATION_TYPE.SUCCESS,
}

export default mockNotification
