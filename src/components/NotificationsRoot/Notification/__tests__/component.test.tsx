import { render } from '@testing-library/react'
import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'

import Notification from '../component'
import { NotificationHook } from '../types'

const mockedHookData: NotificationHook = {
  closeNotification: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Notification component', () => {
  it('matches snapshot', () => {
    const props = {
      duration: NOTIFICATION_DURATION,
      hideNotification: jest.fn(),
      id: 'nanoid',
      messageText: 'test/message',
      messageType: NOTIFICATION_TYPE.SUCCESS
    }
    const { asFragment } = render(<Notification {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
