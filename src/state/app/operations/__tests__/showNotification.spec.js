import { notification } from 'antd'

import showNotification from '../showNotification'

describe('showNotification', () => {
  it('has valid attributes', () => {
    expect(showNotification).toMatchSnapshot()
  })

  it('calls notification success', () => {
    notification.success = jest.fn()
    showNotification.process(
      {
        action: {
          payload: { type: 'success' }
        }
      },
      jest.fn(),
      jest.fn()
    )
    expect(notification.success).toHaveBeenCalled()
  })
})
