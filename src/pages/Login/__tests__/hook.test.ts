import { act } from '@testing-library/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as sessionActions from 'src/store/auth/actions'
import * as reactRedux from 'src/store/hooks'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => ({})),
  useNavigate: jest.fn(),
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)

const mockDispatch = jest.fn()
jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)

describe('Login useContainer hook', () => {
  const setState = jest.fn()
  const useStateMock = (initState: unknown) => [initState, setState]
  jest.spyOn(React, 'useState').mockImplementation(useStateMock as never)
  const logIn = jest.spyOn(sessionActions, 'logIn')

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleLogIn" method with success', async () => {
    jest
      .mocked(mockDispatch)
      .mockReturnValueOnce({ unwrap: () => 'test/session_id' })
    const userData = { password: 'password', username: 'user' }

    const { result } = renderHookWithWrapper(useContainer)

    await act(() => {
      result.current.handleLogIn(userData)
    })

    expect(setState).toHaveBeenCalledTimes(2)
    expect(setState).toHaveBeenNthCalledWith(1, true)
    expect(setState).toHaveBeenNthCalledWith(2, false)
    expect(mockDispatch).toHaveBeenCalled()
    expect(logIn).toHaveBeenCalledWith(userData)
    expect(navigate).toHaveBeenCalledWith('/', { replace: true })
  })

  it('should check "handleLogIn" method with failure', async () => {
    jest.mocked(mockDispatch).mockReturnValueOnce({ unwrap: () => undefined })
    const userData = { password: 'password', username: 'user' }

    const { result } = renderHookWithWrapper(useContainer)

    await act(() => {
      result.current.handleLogIn(userData)
    })

    expect(setState).toHaveBeenCalledTimes(2)
    expect(setState).toHaveBeenNthCalledWith(1, true)
    expect(setState).toHaveBeenNthCalledWith(2, false)
    expect(mockDispatch).toHaveBeenCalled()
    expect(logIn).toHaveBeenCalledWith(userData)
    expect(navigate).not.toHaveBeenCalledWith('/', { replace: true })
  })
})
