import { render } from '@testing-library/react'

import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'
import type { NotificationHook } from '../types'
import Notification from '../component'

const mockedHookData: NotificationHook = {
  closeNotification: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Notification component', () => {
  it('matches snapshot', () => {
    const props = {
      id: 'nanoid',
      messageType: NOTIFICATION_TYPE.SUCCESS,
      messageText: 'test/message',
      duration: NOTIFICATION_DURATION,
      hideNotification: jest.fn()
    }
    const { asFragment } = render(<Notification {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
