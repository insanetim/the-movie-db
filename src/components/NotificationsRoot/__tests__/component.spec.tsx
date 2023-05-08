import { render } from '@testing-library/react'

import mockNotification from 'src/__mocks__/mockNotification'
import type { NotificationsRootHook } from '../types'
import NotificationsRoot from '../component'

const mockedHookData: NotificationsRootHook = {
  notifications: [mockNotification],
  hideNotification: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('NotificationsRoot component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<NotificationsRoot />)

    expect(asFragment()).toMatchSnapshot()
  })
})
