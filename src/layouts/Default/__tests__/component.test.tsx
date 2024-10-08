import mockAccount from 'src/__mocks__/mockAccount'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import DefaultLayout from '../component'
import { HeaderHookReturn } from '../Header/types'

const mockedHeader: HeaderHookReturn = {
  account: mockAccount,
  handleLogIn: jest.fn(),
  handleLogOut: jest.fn(),
  isAuthenticated: true,
}
jest.mock('../Header/hook', () => jest.fn(() => mockedHeader))

describe('DefaultLayout component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<DefaultLayout />)

    expect(asFragment()).toMatchSnapshot()
  })
})
