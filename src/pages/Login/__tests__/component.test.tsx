import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Login from '../component'
import { LoginHookReturn } from '../types'

const mockedHook: jest.Mocked<LoginHookReturn> = {
  handleLogin: jest.fn(),
  isSubmitting: false,
}

jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('Login component', () => {
  beforeEach(() => {
    mockedHook.isSubmitting = false
    mockedHook.handleLogin.mockClear()
  })

  it('renders login form elements and sign up link', () => {
    renderWithWrapper(<Login />)

    expect(
      screen.getByRole('heading', { name: 'The Movie DB' })
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()

    const signupLink = screen.getByRole('link', { name: 'Sign up.' })
    expect(signupLink).toHaveAttribute(
      'href',
      'https://www.themoviedb.org/signup'
    )
    expect(signupLink).toHaveAttribute('target', '_blank')
  })

  it('submits the form with provided credentials', async () => {
    const user = userEvent.setup()

    renderWithWrapper(<Login />)

    await user.type(screen.getByPlaceholderText('Username'), 'john')
    await user.type(screen.getByPlaceholderText('Password'), 'supersecret')

    await user.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(mockedHook.handleLogin).toHaveBeenCalledWith({
      password: 'supersecret',
      username: 'john',
    })
  })

  it('shows loading state while submitting', () => {
    mockedHook.isSubmitting = true

    renderWithWrapper(<Login />)

    const button = screen.getByRole('button', { name: /Sign in/i })

    expect(button).toHaveClass('ant-btn-loading')
  })
})
