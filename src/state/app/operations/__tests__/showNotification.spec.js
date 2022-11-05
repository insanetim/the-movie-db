import { notification } from 'antd'

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
    expect(notification.success).toHaveBeenCalledWith({ message, duration: 2.5 })
  })

  it('calls notification error', () => {
    showNotification.process({
      action: {
        payload: { type: 'error', message }
      }
    })
    expect(notification.error).toHaveBeenCalledWith({ message, duration: 2.5 })
  })
})
