import { render } from '@testing-library/react'
import mockAccount from 'src/__mocks__/mockAccount'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import Layout from '../component'

const mockedHeaderData = { account: mockAccount }
jest.mock('../Header/hook', () => jest.fn(() => mockedHeaderData))

const mockedModalData = { modalType: null }
jest.mock('src/components/ModalRoot/hook', () => jest.fn(() => mockedModalData))

const mockedNotificationsData = { notifications: [] }
jest.mock('src/components/NotificationsRoot/hook', () =>
  jest.fn(() => mockedNotificationsData)
)

describe('Default layout component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Layout />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
