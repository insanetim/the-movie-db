import 'jsdom-global/register'
import { notification } from 'antd'

import { NOTIFICATION_DURATION } from 'src/constants'
import showNotification from '../showNotification'

jest.spyOn(notification, 'success')
jest.spyOn(notification, 'error')

describe('showNotification', () => {
  const message = 'test/message'

  it('has valid attributes', () => {
    expect(showNotification).toMatchSnapshot()
  })

  it('calls notification success', () => {
    showNotification.process({
      action: {
        payload: { type: 'success', message }
      }
    })

    expect(notification.success).toHaveBeenCalledTimes(1)
    expect(notification.success).toHaveBeenCalledWith({ message, duration: NOTIFICATION_DURATION })
  })

  it('calls notification error', () => {
    showNotification.process({
      action: {
        payload: { type: 'error', message }
      }
    })

    expect(notification.error).toHaveBeenCalledTimes(1)
    expect(notification.error).toHaveBeenCalledWith({ message, duration: NOTIFICATION_DURATION })
  })
})
