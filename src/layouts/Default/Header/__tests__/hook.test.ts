import { act } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import mockAccount from 'src/__mocks__/mockAccount'
import * as sessionActions from 'src/store/auth/actions'
import * as reactRedux from 'src/store/hooks'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({})),
  useNavigate: jest.fn(),
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)

const mockDispatch = jest.fn()
jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)

describe('Header useContainer hook', () => {
  const mockState = {
    auth: {
      _persist: {
        rehydrated: true,
        version: -1,
      },
      account: mockAccount,
      isAuthenticated: true,
    },
  }

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleLogin" method', () => {
    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    act(() => {
      result.current.handleLogin()
    })

    expect(navigate).toHaveBeenCalledWith('/login', {
      state: { from: {} },
    })
  })

  it('should check "handleLogout" method', () => {
    const logOut = jest.spyOn(sessionActions, 'logOut')

    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    act(() => {
      result.current.handleLogout()
    })

    expect(mockDispatch).toHaveBeenCalled()
    expect(logOut).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/login', {
      replace: true,
      state: { from: {} },
    })
  })

  it('should check "useEffect" method', () => {
    const mockState = {
      auth: {
        _persist: {
          rehydrated: true,
          version: -1,
        },
        account: null,
        isAuthenticated: true,
      },
    }
    const fetchAccount = jest.spyOn(sessionActions, 'fetchAccount')

    renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    expect(mockDispatch).toHaveBeenCalled()
    expect(fetchAccount).toHaveBeenCalled()
  })
})
