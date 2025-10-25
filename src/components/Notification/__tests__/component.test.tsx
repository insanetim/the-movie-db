import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Notification from '../component'
import { NotificationProps } from '../types'

const mockOpenNotification = jest.fn()

jest.mock('../hook', () =>
  jest.fn(props => {
    // mimic hook side effects by calling onClose immediately
    mockOpenNotification(props)
    return {
      onClose: jest.fn(),
    }
  })
)

describe('Notification component', () => {
  const props: NotificationProps = {
    duration: NOTIFICATION_DURATION,
    hideNotification: jest.fn(),
    id: 'test/id',
    message: 'test/message',
    type: NOTIFICATION_TYPE.SUCCESS,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('invokes notification hook with provided props', () => {
    renderWithWrapper(<Notification {...props} />)

    expect(mockOpenNotification).toHaveBeenCalledWith(props)
  })
})
