import mockNotification from 'src/__mocks__/mockNotification'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import NotificationsRoot from '../component'
import { NotificationsRootHookReturn } from '../types'

const mockedHook: NotificationsRootHookReturn = {
  hideNotification: jest.fn(),
  notifications: [mockNotification],
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('NotificationsRoot component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<NotificationsRoot />)

    expect(asFragment()).toMatchSnapshot()
  })
})
