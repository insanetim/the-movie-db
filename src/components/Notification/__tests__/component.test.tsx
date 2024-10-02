import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Notification from '../component'
import { NotificationHookReturn, NotificationProps } from '../types'

const mockedHook: NotificationHookReturn = {
  onClose: jest.fn(),
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('Notification component', () => {
  const props: NotificationProps = {
    duration: NOTIFICATION_DURATION,
    hideNotification: jest.fn(),
    id: 'test/id',
    message: 'test/message',
    type: NOTIFICATION_TYPE.SUCCESS,
  }

  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<Notification {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
