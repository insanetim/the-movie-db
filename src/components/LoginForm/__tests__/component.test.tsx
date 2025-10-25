import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import LoginForm from '../component'
import { LoginFormHookReturn } from '../types'

const mockedHook: LoginFormHookReturn = {
  isDark: false,
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('LoginForm component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedHook.isDark = false
  })

  it('renders form fields with light theme icon colors when isDark is false', () => {
    renderWithWrapper(
      <LoginForm
        isSubmitting={false}
        onSubmit={jest.fn()}
      />
    )

    expect(
      screen.getByRole('heading', { name: 'The Movie DB' })
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'user' })).toHaveStyle(
      'color: rgba(0,0,0,.45)'
    )
    expect(screen.getByRole('img', { name: 'lock' })).toHaveStyle(
      'color: rgba(0,0,0,.45)'
    )
  })

  it('applies dark theme icon colors when isDark is true', () => {
    mockedHook.isDark = true

    renderWithWrapper(
      <LoginForm
        isSubmitting={false}
        onSubmit={jest.fn()}
      />
    )

    expect(screen.getByRole('img', { name: 'user' })).toHaveStyle(
      'color: rgba(255,255,255,.45)'
    )
    expect(screen.getByRole('img', { name: 'lock' })).toHaveStyle(
      'color: rgba(255,255,255,.45)'
    )
  })

  it('submits form values when user completes the form', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn()

    renderWithWrapper(
      <LoginForm
        isSubmitting={false}
        onSubmit={onSubmit}
      />
    )

    await user.type(screen.getByPlaceholderText('Username'), 'john')
    await user.type(screen.getByPlaceholderText('Password'), 'supersecret')
    await user.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(onSubmit).toHaveBeenCalledWith({
      password: 'supersecret',
      username: 'john',
    })
  })

  it('shows loading state on submit button when isSubmitting is true', () => {
    renderWithWrapper(
      <LoginForm
        isSubmitting
        onSubmit={jest.fn()}
      />
    )

    expect(screen.getByRole('button', { name: /Sign in/i })).toHaveClass(
      'ant-btn-loading'
    )
  })
})
