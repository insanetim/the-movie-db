import { render } from '@testing-library/react'

import NotificationsRoot from '../component'

const mockedHookData = {
  notifications: [
    {
      id: 'test/id',
      messageType: 'success',
      messageText: 'test/message',
      duration: 2.5
    }
  ],
  hideNotification: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('NotificationsRoot component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<NotificationsRoot />)

    expect(asFragment()).toMatchSnapshot()
  })
})
