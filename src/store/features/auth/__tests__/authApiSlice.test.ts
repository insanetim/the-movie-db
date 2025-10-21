import { RequestToken, ValidateWithLoginReq } from '../types'

describe('authApiSlice endpoints', () => {
  const hooksMock = {
    useCreateSessionMutation: Symbol('useCreateSessionMutation'),
    useDeleteSessionMutation: Symbol('useDeleteSessionMutation'),
    useGetAccountQuery: Symbol('useGetAccountQuery'),
    useLazyCreateRequestTokenQuery: Symbol('useLazyCreateRequestTokenQuery'),
    useValidateWithLoginMutation: Symbol('useValidateWithLoginMutation'),
  }

  let builder: {
    mutation: jest.Mock
    query: jest.Mock
  }
  let injectEndpointsMock: jest.Mock

  beforeEach(() => {
    jest.resetModules()

    builder = {
      mutation: jest.fn(),
      query: jest.fn(),
    }

    injectEndpointsMock = jest.fn(
      ({ endpoints }: { endpoints: (b: typeof builder) => unknown }) => {
        endpoints(builder as never)
        return hooksMock
      }
    )

    jest.doMock('src/store/api', () => ({
      apiSlice: {
        injectEndpoints: injectEndpointsMock,
      },
    }))
  })

  it('configures endpoints and re-exports generated hooks', async () => {
    const module = await import('../authApiSlice')

    expect(injectEndpointsMock).toHaveBeenCalledTimes(1)
    expect(injectEndpointsMock).toHaveBeenCalledWith(
      expect.objectContaining({ endpoints: expect.any(Function) })
    )

    expect(builder.query).toHaveBeenCalledTimes(2)
    expect(builder.mutation).toHaveBeenCalledTimes(3)

    const createRequestTokenConfig = builder.query.mock.calls[0][0] as {
      query: () => { url: string }
    }
    expect(createRequestTokenConfig.query()).toEqual({
      url: '/authentication/token/new',
    })

    const createSessionConfig = builder.mutation.mock.calls[0][0] as {
      query: (arg: RequestToken['request_token']) => {
        body: { request_token: RequestToken['request_token'] }
        method: string
        url: string
      }
    }
    expect(createSessionConfig.query('rt')).toEqual({
      body: { request_token: 'rt' },
      method: 'POST',
      url: '/authentication/session/new',
    })

    const deleteSessionConfig = builder.mutation.mock.calls[1][0] as {
      query: (arg: { session_id: string }) => {
        body: { session_id: string }
        method: string
        url: string
      }
    }
    const deleteSessionInput = { session_id: 'sid' }
    expect(deleteSessionConfig.query(deleteSessionInput)).toEqual({
      body: deleteSessionInput,
      method: 'DELETE',
      url: '/authentication/session',
    })

    const getAccountConfig = builder.query.mock.calls[1][0] as {
      query: (arg: string) => {
        params: { session_id: string }
        url: string
      }
    }
    expect(getAccountConfig.query('sid')).toEqual({
      params: { session_id: 'sid' },
      url: '/account',
    })

    const validateWithLoginConfig = builder.mutation.mock.calls[2][0] as {
      query: (arg: ValidateWithLoginReq) => {
        body: ValidateWithLoginReq
        method: string
        url: string
      }
    }
    const validateWithLoginInput: ValidateWithLoginReq = {
      password: 'p',
      request_token: 'rt',
      username: 'u',
    }
    expect(validateWithLoginConfig.query(validateWithLoginInput)).toEqual({
      body: validateWithLoginInput,
      method: 'POST',
      url: '/authentication/token/validate_with_login',
    })

    expect(module.authApiSlice).toBe(hooksMock)
    expect(module.useCreateSessionMutation).toBe(
      hooksMock.useCreateSessionMutation
    )
    expect(module.useDeleteSessionMutation).toBe(
      hooksMock.useDeleteSessionMutation
    )
    expect(module.useGetAccountQuery).toBe(hooksMock.useGetAccountQuery)
    expect(module.useLazyCreateRequestTokenQuery).toBe(
      hooksMock.useLazyCreateRequestTokenQuery
    )
    expect(module.useValidateWithLoginMutation).toBe(
      hooksMock.useValidateWithLoginMutation
    )
  })
})
