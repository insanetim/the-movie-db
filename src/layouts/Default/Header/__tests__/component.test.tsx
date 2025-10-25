import { fireEvent, screen, waitFor } from '@testing-library/react'
import { mergeDeepRight } from 'ramda'
import mockAccount from 'src/__mocks__/mockAccount'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Header from '../component'
import { HeaderHookReturn } from '../types'

const mockedHook: HeaderHookReturn = {
  account: mockAccount,
  handleLogin: jest.fn(),
  handleLogout: jest.fn(),
  sessionId: 'test/session_id',
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('Header component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedHook.account = mockAccount
    mockedHook.sessionId = 'test/session_id'
  })

  it('should render app logo and user dropdown', async () => {
    renderWithWrapper(<Header />)

    expect(screen.getByRole('link', { name: /the movie db/i })).toHaveAttribute(
      'href',
      '/'
    )

    const dropdownTrigger = screen.getByText(mockAccount.username)
    fireEvent.mouseEnter(dropdownTrigger)
    fireEvent.click(dropdownTrigger)

    await waitFor(() =>
      expect(document.querySelector('.ant-dropdown-menu')).not.toBeNull()
    )
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
    expect(mockedHook.handleLogout).not.toHaveBeenCalled()

    fireEvent.click(screen.getByText(/sign out/i))
    expect(mockedHook.handleLogout).toHaveBeenCalled()
  })

  it('should render avatar when avatar_path is provided', () => {
    mockedHook.account = mergeDeepRight(mockAccount, {
      avatar: { tmdb: { avatar_path: '/image' } },
    })

    renderWithWrapper(<Header />)

    const avatarImg = screen.getByAltText('User avatar')
    expect(avatarImg).toHaveAttribute(
      'src',
      'https://www.themoviedb.org/t/p/w32_and_h32_face/image'
    )
  })

  it('should render default avatar when account is missing', () => {
    mockedHook.account = null

    renderWithWrapper(<Header />)

    expect(document.querySelector('.ant-avatar')).not.toBeNull()
  })

  it('should show sign in link when user is unauthenticated', () => {
    mockedHook.sessionId = null

    renderWithWrapper(<Header />)

    const signInLink = screen.getByText(/sign in/i)
    fireEvent.click(signInLink)

    expect(mockedHook.handleLogin).toHaveBeenCalled()
  })
})
