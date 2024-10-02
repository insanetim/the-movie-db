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

describe('Header useContainer hook', () => {
  const mockDispatch = jest.fn()
  jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)
  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector')

  it('should match snapshot', () => {
    useSelectorMock.mockReturnValueOnce(mockAccount)
    useSelectorMock.mockReturnValueOnce(true)

    const { result } = renderHookWithWrapper(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleLogIn" method', () => {
    const { result } = renderHookWithWrapper(useContainer)

    act(() => {
      result.current.handleLogIn()
    })

    expect(navigate).toHaveBeenCalledWith('/login', {
      state: { from: {} },
    })
  })

  it('should check "handleLogOut" method', () => {
    const logOut = jest.spyOn(sessionActions, 'logOut')

    const { result } = renderHookWithWrapper(useContainer)

    act(() => {
      result.current.handleLogOut()
    })

    expect(mockDispatch).toHaveBeenCalled()
    expect(logOut).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/login', {
      replace: true,
      state: { from: {} },
    })
  })

  it('should check "useEffect" method', () => {
    useSelectorMock.mockReturnValueOnce(null)
    useSelectorMock.mockReturnValueOnce(true)
    const fetchAccount = jest.spyOn(sessionActions, 'fetchAccount')

    renderHookWithWrapper(useContainer)

    expect(mockDispatch).toHaveBeenCalled()
    expect(fetchAccount).toHaveBeenCalled()
  })
})
