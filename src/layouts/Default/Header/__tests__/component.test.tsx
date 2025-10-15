import { mergeDeepRight } from 'ramda'
import mockAccount from 'src/__mocks__/mockAccount'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Header from '../component'
import { HeaderHookReturn } from '../types'

const mockedHook: HeaderHookReturn = {
  account: mockAccount,
  handleLogin: jest.fn(),
  handleLogout: jest.fn(),
  isAuthenticated: true,
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('Header component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<Header />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with avatar_path', () => {
    mockedHook.account = mergeDeepRight(mockAccount, {
      avatar: { tmdb: { avatar_path: '/image' } },
    })

    const { asFragment } = renderWithWrapper(<Header />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with empty account', () => {
    mockedHook.account = null

    const { asFragment } = renderWithWrapper(<Header />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot for unauthenticated', () => {
    mockedHook.isAuthenticated = false

    const { asFragment } = renderWithWrapper(<Header />)

    expect(asFragment()).toMatchSnapshot()
  })
})
