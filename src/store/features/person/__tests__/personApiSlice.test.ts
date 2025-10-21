describe('personApiSlice endpoints', () => {
  const hooksMock = {
    useGetPersonDetailsQuery: Symbol('useGetPersonDetailsQuery'),
  }

  // Define the query function type explicitly
  type PersonQueryFunction = (personId: number) => {
    params: { append_to_response: string }
    url: string
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
    const module = await import('../personApiSlice')

    expect(injectEndpointsMock).toHaveBeenCalledTimes(1)
    expect(injectEndpointsMock).toHaveBeenCalledWith(
      expect.objectContaining({ endpoints: expect.any(Function) })
    )

    expect(builder.mutation).toHaveBeenCalledTimes(0)
    expect(builder.query).toHaveBeenCalledTimes(1)

    // Test getPersonDetails query function
    const getPersonDetailsConfig = builder.query.mock.calls[0][0] as {
      query: PersonQueryFunction
    }
    expect(typeof getPersonDetailsConfig.query).toBe('function')

    // Test the query function with a sample personId
    const testPersonId = 123
    const queryResult = getPersonDetailsConfig.query(testPersonId)
    expect(queryResult).toEqual({
      params: { append_to_response: 'external_ids,movie_credits' },
      url: `/person/${testPersonId}`,
    })

    expect(module.personApiSlice).toBe(hooksMock)
    expect(module.useGetPersonDetailsQuery).toBe(
      hooksMock.useGetPersonDetailsQuery
    )
  })
})
