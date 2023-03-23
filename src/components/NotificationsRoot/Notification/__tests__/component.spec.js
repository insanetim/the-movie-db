import { render } from '@testing-library/react'

import Notification from '../component'

const mockedHookData = {}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Notification component', () => {
  it('matches snapshot', () => {
    const props = {
      id: 'test/id',
      messageType: 'success',
      messageText: 'test/message',
      duration: 2.5,
      hideNotification: jest.fn()
    }
    const { asFragment } = render(<Notification {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
