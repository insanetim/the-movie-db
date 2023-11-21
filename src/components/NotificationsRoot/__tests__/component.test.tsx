import { render } from '@testing-library/react'
import mockNotification from 'src/__mocks__/mockNotification'

import NotificationsRoot from '../component'
import { NotificationsRootHook } from '../types'

const mockedHookData: NotificationsRootHook = {
  hideNotification: jest.fn(),
  notifications: [mockNotification]
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('NotificationsRoot component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<NotificationsRoot />)

    expect(asFragment()).toMatchSnapshot()
  })
})
