import { screen } from '@testing-library/react'
import mockNotification from 'src/__mocks__/mockNotification'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Notification from '../../Notification'
import NotificationsRoot from '../component'
import { NotificationsRootHookReturn } from '../types'

const mockedHook: NotificationsRootHookReturn = {
  hideNotification: jest.fn(),
  notifications: [mockNotification],
}

jest.mock('../../Notification', () =>
  jest.fn(({ message }: { message: string }) => (
    <div data-testid={`notification-${message}`} />
  ))
)

jest.mock('../hook', () => jest.fn(() => mockedHook))

const mockedNotification = Notification as jest.Mock

describe('NotificationsRoot component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedHook.notifications = [mockNotification]
  })

  it('renders notifications using data from the hook', () => {
    renderWithWrapper(<NotificationsRoot />)

    expect(
      screen.getByTestId(`notification-${mockNotification.message}`)
    ).toBeInTheDocument()
    expect(mockedNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        hideNotification: mockedHook.hideNotification,
        id: mockNotification.id,
        message: mockNotification.message,
      }),
      expect.anything()
    )
  })

  it('renders nothing when there are no notifications', () => {
    mockedHook.notifications = []

    const { container } = renderWithWrapper(<NotificationsRoot />)

    expect(mockedNotification).not.toHaveBeenCalled()
    expect(container).toBeEmptyDOMElement()
  })
})
