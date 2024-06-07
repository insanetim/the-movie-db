import { act, renderHook } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import mockAccount from 'src/__mocks__/mockAccount'
import { dispatch } from 'src/__mocks__/react-redux'
import { IAccount } from 'src/interfaces/account.interface'
import * as sessionActions from 'src/store/auth/actions'

import useContainer from '../hook'

let mockedAccount: IAccount | null = mockAccount
jest.mock('src/store/auth/selectors', () => ({
  accountSelector: () => mockedAccount,
  isAuthenticatedSelector: () => true,
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({})),
  useNavigate: jest.fn(),
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)

describe('Header useContainer hook', () => {
  it('should match snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleLogIn" method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handleLogIn()
    })

    expect(navigate).toHaveBeenCalledWith('/login', {
      state: { from: {} },
    })
  })

  it('should check "handleLogOut" method', () => {
    const logOut = jest.spyOn(sessionActions, 'logOut')
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handleLogOut()
    })

    expect(dispatch).toHaveBeenCalled()
    expect(logOut).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/login', {
      replace: true,
      state: { from: {} },
    })
  })

  it('should check "useEffect" method', () => {
    mockedAccount = null
    const fetchAccount = jest.spyOn(sessionActions, 'fetchAccount')
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalled()
    expect(fetchAccount).toHaveBeenCalled()
  })
})
