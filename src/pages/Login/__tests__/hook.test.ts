import { unwrapResult } from '@reduxjs/toolkit'
import { act, renderHook } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { dispatch } from 'src/__mocks__/react-redux'
import * as sessionActions from 'src/store/session/actions'

import useContainer from '../hook'

jest.mock('src/store/session/selectors', () => ({
  loadingSelector: () => false,
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => ({})),
  useNavigate: jest.fn(),
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  unwrapResult: jest.fn(),
}))

describe('Login useContainer hook', () => {
  const logIn = jest.spyOn(sessionActions, 'logIn')

  it('should match snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleLogIn" method with success', async () => {
    jest.mocked(unwrapResult).mockReturnValueOnce('test/session_id')
    const userData = { password: 'password', username: 'user' }
    const { result } = renderHook(useContainer)

    await act(() => {
      result.current.handleLogIn(userData)
    })

    expect(dispatch).toHaveBeenCalled()
    expect(logIn).toHaveBeenCalledWith(userData)
    expect(navigate).toHaveBeenCalledWith('/', { replace: true })
  })

  it('should check "handleLogIn" method with failure', async () => {
    jest.mocked(unwrapResult).mockReturnValueOnce(undefined)
    const userData = { password: 'password', username: 'user' }
    const { result } = renderHook(useContainer)

    await act(() => {
      result.current.handleLogIn(userData)
    })

    expect(dispatch).toHaveBeenCalled()
    expect(logIn).toHaveBeenCalledWith(userData)
    expect(navigate).not.toHaveBeenCalledWith('/', { replace: true })
  })
})
