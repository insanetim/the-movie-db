import { unwrapResult } from '@reduxjs/toolkit'
import { act, renderHook } from '@testing-library/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { dispatch } from 'src/__mocks__/react-redux'
import * as sessionActions from 'src/store/auth/actions'

import useContainer from '../hook'

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
  const setState = jest.fn()
  const useStateMock = (initState: unknown) => [initState, setState]
  jest.spyOn(React, 'useState').mockImplementation(useStateMock as never)
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

    expect(setState).toHaveBeenCalledTimes(2)
    expect(setState).toHaveBeenNthCalledWith(1, true)
    expect(setState).toHaveBeenNthCalledWith(2, false)
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

    expect(setState).toHaveBeenCalledTimes(2)
    expect(setState).toHaveBeenNthCalledWith(1, true)
    expect(setState).toHaveBeenNthCalledWith(2, false)
    expect(dispatch).toHaveBeenCalled()
    expect(logIn).toHaveBeenCalledWith(userData)
    expect(navigate).not.toHaveBeenCalledWith('/', { replace: true })
  })
})
