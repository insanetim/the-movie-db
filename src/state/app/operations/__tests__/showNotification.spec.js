import { notification } from 'antd'

import showNotification from '../showNotification'

jest.mock('antd', () => ({
  notification: {
    success: jest.fn(),
    error: jest.fn()
  }
}))

describe('showNotification', () => {
  const message = 'test/message'

  it('has valid attributes', () => {
    expect(showNotification).toMatchSnapshot()
  })

  it('calls notification success', () => {
    showNotification.process(
      {
        action: {
          payload: { type: 'success', message }
        }
      },
      jest.fn(),
      jest.fn()
    )
    expect(notification.success).toHaveBeenCalledWith({ message, duration: 2.5 })
  })

  it('calls notification error', () => {
    showNotification.process(
      {
        action: {
          payload: { type: 'error', message }
        }
      },
      jest.fn(),
      jest.fn()
    )
    expect(notification.error).toHaveBeenCalledWith({ message, duration: 2.5 })
  })
})
