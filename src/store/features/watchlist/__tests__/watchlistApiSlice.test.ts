describe('watchlistApiSlice endpoints', () => {
  const hooksMock = {
    useAddToWatchlistMutation: Symbol('useAddToWatchlistMutation'),
    useGetWatchlistMoviesQuery: Symbol('useGetWatchlistMoviesQuery'),
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

    jest.doMock('../../movie', () => ({
      movieApiSlice: {
        util: {
          updateQueryData: jest.fn(),
        },
      },
    }))

    jest.doMock('src/store/api', () => ({
      apiSlice: {
        enhanceEndpoints: enhanceEndpointsMock,
        injectEndpoints: jest.fn(() => ({})),
      },
    }))
  })

  it('configures endpoints with tagTypes and re-exports generated hooks', async () => {
    const module = await import('../watchlistApiSlice')

    expect(enhanceEndpointsMock).toHaveBeenCalledTimes(1)
    expect(enhanceEndpointsMock).toHaveBeenCalledWith(
      expect.objectContaining({ addTagTypes: ['WatchlistMovies'] })
    )

    expect(injectEndpointsMock).toHaveBeenCalledTimes(1)
    expect(injectEndpointsMock).toHaveBeenCalledWith(
      expect.objectContaining({ endpoints: expect.any(Function) })
    )

    expect(builder.mutation).toHaveBeenCalledTimes(1)
    expect(builder.query).toHaveBeenCalledTimes(1)

    // Test addToWatchlist mutation
    const addToWatchlistConfig = builder.mutation.mock.calls[0][0] as {
      invalidatesTags: string[]
      onQueryStarted: Function
      queryFn: Function
    }
    expect(addToWatchlistConfig.invalidatesTags).toEqual(['WatchlistMovies'])
    expect(typeof addToWatchlistConfig.onQueryStarted).toBe('function')
    expect(typeof addToWatchlistConfig.queryFn).toBe('function')

    // Test getWatchlistMovies query
    const getWatchlistMoviesConfig = builder.query.mock.calls[0][0] as {
      providesTags: string[]
      queryFn: Function
    }
    expect(getWatchlistMoviesConfig.providesTags).toEqual(['WatchlistMovies'])
    expect(typeof getWatchlistMoviesConfig.queryFn).toBe('function')

    expect(module.watchlistApiSlice).toBe(hooksMock)
    expect(module.useAddToWatchlistMutation).toBe(
      hooksMock.useAddToWatchlistMutation
    )
    expect(module.useGetWatchlistMoviesQuery).toBe(
      hooksMock.useGetWatchlistMoviesQuery
    )
  })
})
