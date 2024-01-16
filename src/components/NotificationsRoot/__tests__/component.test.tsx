import { render } from '@testing-library/react'
import mockNotification from 'src/__mocks__/mockNotification'

import NotificationsRoot from '../component'
import { NotificationsRootHookReturn } from '../types'

const mockedHook: NotificationsRootHookReturn = {
  hideNotification: jest.fn(),
  notifications: [mockNotification],
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('NotificationsRoot component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<NotificationsRoot />)

    expect(asFragment()).toMatchSnapshot()
  })
})
