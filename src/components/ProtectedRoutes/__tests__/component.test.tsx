import { Location } from 'react-router-dom'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ProtectedRoutes from '../component'
import { ProtectedRoutesHookReturn } from '../types'

const mockedHook: ProtectedRoutesHookReturn = {
  location: { pathname: '/private' } as Location,
  sessionId: 'test/session_id',
}

const mockNavigateProps = jest.fn()

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom')

  return {
    ...actual,
    Navigate: jest.fn(props => {
      mockNavigateProps(props)

      return <div data-testid='navigate' />
    }),
    Outlet: jest.fn(() => <div data-testid='protected-outlet' />),
  }
})

jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('ProtectedRoutes component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedHook.location = { pathname: '/private' } as Location
    mockedHook.sessionId = 'test/session_id'
  })

  it('renders nested routes when session exists', () => {
    const { getByTestId, queryByTestId } = renderWithWrapper(
      <ProtectedRoutes />
    )

    expect(getByTestId('protected-outlet')).toBeInTheDocument()
    expect(queryByTestId('navigate')).not.toBeInTheDocument()
    expect(mockNavigateProps).not.toHaveBeenCalled()
  })

  it('redirects to login when session is missing', () => {
    mockedHook.sessionId = null

    const { getByTestId } = renderWithWrapper(<ProtectedRoutes />)

    expect(getByTestId('navigate')).toBeInTheDocument()
    expect(mockNavigateProps).toHaveBeenCalledWith({
      replace: true,
      state: { from: mockedHook.location },
      to: '/login',
    })
  })
})
