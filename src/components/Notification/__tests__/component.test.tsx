import { render } from '@testing-library/react'
import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'

import Notification from '../component'
import { NotificationHookReturn, NotificationProps } from '../types'

const mockedHook: NotificationHookReturn = {
  closeNotification: jest.fn(),
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('Notification component', () => {
  const props: NotificationProps = {
    duration: NOTIFICATION_DURATION,
    hideNotification: jest.fn(),
    id: 'test/id',
    messageText: 'test/message',
    messageType: NOTIFICATION_TYPE.SUCCESS,
  }

  it('should match snapshot', () => {
    const { asFragment } = render(<Notification {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
