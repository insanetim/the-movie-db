describe('listApiSlice endpoints', () => {
  const hooksMock = {
    useAddMovieToListMutation: Symbol('useAddMovieToListMutation'),
    useCreateListMutation: Symbol('useCreateListMutation'),
    useDeleteListMutation: Symbol('useDeleteListMutation'),
    useGetListDetailsQuery: Symbol('useGetListDetailsQuery'),
    useGetListsQuery: Symbol('useGetListsQuery'),
    usePrefetch: Symbol('usePrefetch'),
    useRemoveMovieFromListMutation: Symbol('useRemoveMovieFromListMutation'),
  }

  let builder: {
    mutation: jest.Mock
    query: jest.Mock
  }
  let enhanceEndpointsMock: jest.Mock
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

    enhanceEndpointsMock = jest.fn(() => ({
      injectEndpoints: injectEndpointsMock,
    }))

    jest.doMock('../../auth', () => ({
      selectAccount: jest.fn(),
      selectSessionId: jest.fn(),
    }))

    jest.doMock('src/store/api', () => ({
      apiSlice: {
        enhanceEndpoints: enhanceEndpointsMock,
        injectEndpoints: jest.fn(() => ({})),
      },
    }))
  })

  it('configures endpoints with tagTypes and re-exports generated hooks', async () => {
    const module = await import('../listApiSlice')

    expect(enhanceEndpointsMock).toHaveBeenCalledTimes(1)
    expect(enhanceEndpointsMock).toHaveBeenCalledWith(
      expect.objectContaining({ addTagTypes: ['Lists', 'ListDetails'] })
    )

    expect(injectEndpointsMock).toHaveBeenCalledTimes(1)
    expect(injectEndpointsMock).toHaveBeenCalledWith(
      expect.objectContaining({ endpoints: expect.any(Function) })
    )

    expect(builder.mutation).toHaveBeenCalledTimes(4)
    expect(builder.query).toHaveBeenCalledTimes(2)

    // Test addMovieToList mutation
    const addMovieToListConfig = builder.mutation.mock.calls[0][0] as {
      invalidatesTags: Function
      queryFn: Function
    }
    expect(typeof addMovieToListConfig.invalidatesTags).toBe('function')
    expect(typeof addMovieToListConfig.queryFn).toBe('function')

    // Test createList mutation
    const createListConfig = builder.mutation.mock.calls[1][0] as {
      invalidatesTags: string[]
      queryFn: Function
    }
    expect(createListConfig.invalidatesTags).toEqual(['Lists'])
    expect(typeof createListConfig.queryFn).toBe('function')

    // Test deleteList mutation
    const deleteListConfig = builder.mutation.mock.calls[2][0] as {
      invalidatesTags: string[]
      queryFn: Function
    }
    expect(deleteListConfig.invalidatesTags).toEqual(['Lists'])
    expect(typeof deleteListConfig.queryFn).toBe('function')

    // Test getListDetails query
    const getListDetailsConfig = builder.query.mock.calls[0][0] as {
      providesTags: Function
      query: Function
    }
    expect(typeof getListDetailsConfig.providesTags).toBe('function')
    expect(typeof getListDetailsConfig.query).toBe('function')

    // Test getLists query
    const getListsConfig = builder.query.mock.calls[1][0] as {
      providesTags: string[]
      queryFn: Function
    }
    expect(getListsConfig.providesTags).toEqual(['Lists'])
    expect(typeof getListsConfig.queryFn).toBe('function')

    // Test removeMovieFromList mutation
    const removeMovieFromListConfig = builder.mutation.mock.calls[3][0] as {
      invalidatesTags: Function
      queryFn: Function
    }
    expect(typeof removeMovieFromListConfig.invalidatesTags).toBe('function')
    expect(typeof removeMovieFromListConfig.queryFn).toBe('function')

    expect(module.listApiSlice).toBe(hooksMock)
    expect(module.useAddMovieToListMutation).toBe(
      hooksMock.useAddMovieToListMutation
    )
    expect(module.useCreateListMutation).toBe(
      hooksMock.useCreateListMutation
    )
    expect(module.useDeleteListMutation).toBe(
      hooksMock.useDeleteListMutation
    )
    expect(module.useGetListDetailsQuery).toBe(
      hooksMock.useGetListDetailsQuery
    )
    expect(module.useGetListsQuery).toBe(hooksMock.useGetListsQuery)
    expect(module.usePrefetch).toBe(hooksMock.usePrefetch)
    expect(module.useRemoveMovieFromListMutation).toBe(
      hooksMock.useRemoveMovieFromListMutation
    )
  })
})
