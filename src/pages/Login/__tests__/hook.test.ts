import { act, renderHook, waitFor } from '@testing-library/react'
import { useLocation, useNavigate } from 'react-router-dom'
import useHandleError from 'src/hooks/useHandleError'
import {
  useCreateSessionMutation,
  useLazyCreateRequestTokenQuery,
  UserData,
  useValidateWithLoginMutation,
} from 'src/store/features/auth'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}))
jest.mock('src/hooks/useHandleError')
jest.mock('src/store/features/auth')

const mockUseLocation = useLocation as jest.MockedFunction<typeof useLocation>
const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>
const mockUseLazyCreateRequestTokenQuery =
  useLazyCreateRequestTokenQuery as jest.MockedFunction<
    typeof useLazyCreateRequestTokenQuery
  >
const mockUseValidateWithLoginMutation =
  useValidateWithLoginMutation as jest.MockedFunction<
    typeof useValidateWithLoginMutation
  >
const mockUseCreateSessionMutation =
  useCreateSessionMutation as jest.MockedFunction<
    typeof useCreateSessionMutation
  >
const mockUseHandleError = useHandleError as jest.MockedFunction<
  typeof useHandleError
>

describe('Login useContainer hook', () => {
  let navigate: jest.Mock
  let handleError: jest.Mock

  let triggerCreateToken: jest.Mock
  let unwrapTokenOk: jest.Mock
  let unwrapTokenErr: jest.Mock

  let triggerValidate: jest.Mock
  let unwrapValidateOk: jest.Mock

  let triggerCreateSession: jest.Mock
  let unwrapSessionOk: jest.Mock

  beforeEach(() => {
    // router
    navigate = jest.fn()
    mockUseNavigate.mockReturnValue(navigate as never)
    mockUseLocation.mockReturnValue({ state: undefined } as never)

    // error handler
    handleError = jest.fn()
    mockUseHandleError.mockReturnValue({ handleError } as never)

    // token
    unwrapTokenOk = jest.fn().mockResolvedValue({ request_token: 'rt' })
    unwrapTokenErr = jest.fn().mockRejectedValue('err-token')
    triggerCreateToken = jest.fn().mockReturnValue({ unwrap: unwrapTokenOk })
    mockUseLazyCreateRequestTokenQuery.mockReturnValue([
      triggerCreateToken,
    ] as never)

    // validate
    unwrapValidateOk = jest.fn().mockResolvedValue({})
    triggerValidate = jest.fn().mockReturnValue({ unwrap: unwrapValidateOk })
    mockUseValidateWithLoginMutation.mockReturnValue([triggerValidate] as never)

    // session
    unwrapSessionOk = jest.fn().mockResolvedValue({ success: true })
    triggerCreateSession = jest
      .fn()
      .mockReturnValue({ unwrap: unwrapSessionOk })
    mockUseCreateSessionMutation.mockReturnValue([
      triggerCreateSession,
    ] as never)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should login successfully and navigate to root by default', async () => {
    const { result } = renderHook(() => useContainer())
    const userData = { password: 'p', username: 'u' } as UserData

    expect(result.current.isSubmitting).toBe(false)

    await act(async () => {
      await result.current.handleLogin(userData)
    })

    // sequence
    expect(triggerCreateToken).toHaveBeenCalled()
    expect(unwrapTokenOk).toHaveBeenCalled()
    expect(triggerValidate).toHaveBeenCalledWith({
      request_token: 'rt',
      ...userData,
    })
    expect(unwrapValidateOk).toHaveBeenCalled()
    expect(triggerCreateSession).toHaveBeenCalledWith('rt')
    expect(unwrapSessionOk).toHaveBeenCalled()

    // navigation
    expect(navigate).toHaveBeenCalledWith('/', { replace: true })

    // submitting toggled off
    expect(result.current.isSubmitting).toBe(false)
  })

  it('should navigate to `from` when provided', async () => {
    mockUseLocation.mockReturnValue({
      state: { from: { pathname: '/back' } },
    } as never)
    const { result } = renderHook(() => useContainer())
    const userData = { password: 'p', username: 'u' } as UserData

    await act(async () => {
      await result.current.handleLogin(userData)
    })

    expect(navigate).toHaveBeenCalledWith('/back', { replace: true })
  })

  it('should call handleError on any failure and stop submitting', async () => {
    // make token step fail
    mockUseLazyCreateRequestTokenQuery.mockReturnValue([
      jest.fn().mockReturnValue({ unwrap: unwrapTokenErr }),
    ] as never)

    const { result } = renderHook(() => useContainer())

    await act(async () => {
      await result.current.handleLogin({
        password: 'p',
        username: 'u',
      } as UserData)
    })

    expect(handleError).toHaveBeenCalled()
    expect(result.current.isSubmitting).toBe(false)
  })

  it('should set submitting true during process', async () => {
    // Defer the token step to keep the process in-flight immediately
    let resolveToken: () => void
    const tokenDeferred = new Promise<void>(res => {
      resolveToken = res
    })

    mockUseLazyCreateRequestTokenQuery.mockReturnValue([
      jest.fn().mockReturnValue({
        unwrap: jest.fn().mockImplementation(async () => {
          await tokenDeferred
          return { request_token: 'rt' }
        }),
      }),
    ] as never)

    const { result } = renderHook(() => useContainer())

    let p!: Promise<unknown>
    await act(async () => {
      p = result.current.handleLogin({
        password: 'p',
        username: 'u',
      } as UserData)
    })
    await waitFor(() => expect(result.current.isSubmitting).toBe(true))
    resolveToken!()
    await p
    await waitFor(() => expect(result.current.isSubmitting).toBe(false))
  })
})
