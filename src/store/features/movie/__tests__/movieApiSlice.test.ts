describe('movieApiSlice endpoints', () => {
  const hooksMock = {
    useGetMovieDetailsQuery: Symbol('useGetMovieDetailsQuery'),
    useGetSearchMoviesQuery: Symbol('useGetSearchMoviesQuery'),
    useGetTrendingMoviesQuery: Symbol('useGetTrendingMoviesQuery'),
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

    jest.doMock('../../auth', () => ({
      selectSessionId: jest.fn(),
    }))

    jest.doMock('src/api/imdb/apiRoutes', () => ({
      getImdbInfo: jest.fn(),
    }))

    jest.doMock('ramda', () => ({
      assoc: jest.fn(),
    }))

    jest.doMock('src/store/api', () => ({
      apiSlice: {
        injectEndpoints: injectEndpointsMock,
      },
    }))
  })

  it('configures endpoints and re-exports generated hooks', async () => {
    const module = await import('../movieApiSlice')

    expect(injectEndpointsMock).toHaveBeenCalledTimes(1)
    expect(injectEndpointsMock).toHaveBeenCalledWith(
      expect.objectContaining({ endpoints: expect.any(Function) })
    )

    expect(builder.mutation).toHaveBeenCalledTimes(0)
    expect(builder.query).toHaveBeenCalledTimes(3)

    // Test getMovieDetails query
    const getMovieDetailsConfig = builder.query.mock.calls[0][0] as {
      queryFn: Function
    }
    expect(typeof getMovieDetailsConfig.queryFn).toBe('function')

    // Test getSearchMovies query
    const getSearchMoviesConfig = builder.query.mock.calls[1][0] as {
      query: Function
    }
    expect(typeof getSearchMoviesConfig.query).toBe('function')

    // Test getTrendingMovies query
    const getTrendingMoviesConfig = builder.query.mock.calls[2][0] as {
      query: Function
    }
    expect(typeof getTrendingMoviesConfig.query).toBe('function')

    expect(module.movieApiSlice).toBe(hooksMock)
    expect(module.useGetMovieDetailsQuery).toBe(
      hooksMock.useGetMovieDetailsQuery
    )
    expect(module.useGetSearchMoviesQuery).toBe(
      hooksMock.useGetSearchMoviesQuery
    )
    expect(module.useGetTrendingMoviesQuery).toBe(
      hooksMock.useGetTrendingMoviesQuery
    )
  })
})
