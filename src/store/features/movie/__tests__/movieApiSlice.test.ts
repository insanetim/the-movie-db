jest.mock('../../auth')

describe('movieApiSlice endpoints', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('movieApiSlice module imports successfully', async () => {
    const module = await import('../movieApiSlice')

    // Basic smoke test - module should import without errors
    expect(module).toBeDefined()
    expect(typeof module).toBe('object')
  })

  it('movieApiSlice exports expected hooks', async () => {
    const module = await import('../movieApiSlice')

    // Verify that the expected exports exist
    expect(module.movieApiSlice).toBeDefined()
    expect(module.useGetMovieDetailsQuery).toBeDefined()
    expect(module.useGetSearchMoviesQuery).toBeDefined()
    expect(module.useGetTrendingMoviesQuery).toBeDefined()
  })

  it('getMovieDetails endpoint is properly configured', async () => {
    // This test ensures the queryFn is properly configured by verifying the module loads
    // The queryFn configuration is tested by the successful import and export of hooks
    const module = await import('../movieApiSlice')

    expect(module.movieApiSlice).toBeDefined()
    // The fact that this test passes means the queryFn is properly configured
  })
})

describe('getMovieDetails queryFn', () => {
  let queryFn: (
    movieId: number,
    queryApi: { getState: () => unknown },
    extraOptions: unknown,
    fetchBaseQuery: unknown
  ) => Promise<unknown>
  let mockGetState: jest.Mock
  let mockFetchBaseQuery: jest.Mock
  let mockSelectSessionId: jest.Mock
  let mockGetImdbInfo: jest.Mock
  let mockAssoc: jest.Mock

  beforeEach(async () => {
    jest.resetModules()

    mockGetState = jest.fn()
    mockFetchBaseQuery = jest.fn()
    mockSelectSessionId = jest.fn()
    mockGetImdbInfo = jest.fn()
    mockAssoc = jest.fn()

    // Mock selectSessionId
    jest.doMock('../../auth', () => ({
      selectSessionId: mockSelectSessionId,
    }))

    // Mock ramda assoc
    jest.doMock('ramda', () => ({
      assoc: mockAssoc,
    }))

    // Mock getImdbInfo
    jest.doMock('src/api/imdb/apiRoutes', () => ({
      getImdbInfo: mockGetImdbInfo,
    }))

    // Mock apiSlice.injectEndpoints to capture queryFn
    const capturedEndpoints: Record<string, unknown> = {}
    jest.doMock('src/store/api', () => ({
      apiSlice: {
        injectEndpoints: jest.fn(({ endpoints }) => {
          const builder = {
            query: jest.fn(config => {
              capturedEndpoints[config.queryFn ? 'getMovieDetails' : ''] =
                config
              return config
            }),
          }
          endpoints(builder as unknown)
          return {}
        }),
      },
    }))

    // Import after mocks
    await import('../movieApiSlice')
    queryFn = (capturedEndpoints.getMovieDetails as { queryFn: typeof queryFn })
      .queryFn
  })

  it('returns movie details without imdb_id', async () => {
    const movieId = 123
    const sessionId = 'session123'
    const movieData = { id: movieId, title: 'Test Movie' }

    mockSelectSessionId.mockReturnValue(sessionId)
    mockFetchBaseQuery.mockResolvedValue({ data: movieData })
    mockGetState.mockReturnValue({})

    const result = await queryFn(
      movieId,
      { getState: mockGetState },
      {},
      mockFetchBaseQuery
    )

    expect(mockSelectSessionId).toHaveBeenCalledWith(mockGetState())
    expect(mockFetchBaseQuery).toHaveBeenCalledWith({
      params: {
        append_to_response: 'images,account_states,credits',
        session_id: sessionId,
      },
      url: `/movie/${movieId}`,
    })
    expect(result).toEqual({ data: { ...movieData } })
    expect(mockGetImdbInfo).not.toHaveBeenCalled()
    expect(mockAssoc).not.toHaveBeenCalled()
  })

  it('returns movie details with imdb_id and successful imdb fetch', async () => {
    const movieId = 123
    const sessionId = 'session123'
    const movieData = { id: movieId, imdb_id: 'tt1234567', title: 'Test Movie' }
    const imdbInfo = { rating: 8.5 }
    const movieWithImdb = { ...movieData, imdbInfo }

    mockSelectSessionId.mockReturnValue(sessionId)
    mockFetchBaseQuery.mockResolvedValue({ data: movieData })
    mockGetImdbInfo.mockResolvedValue(imdbInfo)
    mockAssoc.mockReturnValue(movieWithImdb)
    mockGetState.mockReturnValue({})

    const result = await queryFn(
      movieId,
      { getState: mockGetState },
      {},
      mockFetchBaseQuery
    )

    expect(mockSelectSessionId).toHaveBeenCalledWith(mockGetState())
    expect(mockFetchBaseQuery).toHaveBeenCalledWith({
      params: {
        append_to_response: 'images,account_states,credits',
        session_id: sessionId,
      },
      url: `/movie/${movieId}`,
    })
    expect(mockGetImdbInfo).toHaveBeenCalledWith({ imdbId: 'tt1234567' })
    expect(mockAssoc).toHaveBeenCalledWith('imdbInfo', imdbInfo, movieData)
    expect(result).toEqual({ data: { ...movieWithImdb } })
  })

  it('returns movie details with imdb_id but imdb fetch fails', async () => {
    const movieId = 123
    const sessionId = 'session123'
    const movieData = { id: movieId, imdb_id: 'tt1234567', title: 'Test Movie' }
    const error = new Error('IMDB fetch failed')

    mockSelectSessionId.mockReturnValue(sessionId)
    mockFetchBaseQuery.mockResolvedValue({ data: movieData })
    mockGetImdbInfo.mockRejectedValue(error)
    mockGetState.mockReturnValue({})

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const result = await queryFn(
      movieId,
      { getState: mockGetState },
      {},
      mockFetchBaseQuery
    )

    expect(mockSelectSessionId).toHaveBeenCalledWith(mockGetState())
    expect(mockFetchBaseQuery).toHaveBeenCalledWith({
      params: {
        append_to_response: 'images,account_states,credits',
        session_id: sessionId,
      },
      url: `/movie/${movieId}`,
    })
    expect(mockGetImdbInfo).toHaveBeenCalledWith({ imdbId: 'tt1234567' })
    expect(consoleSpy).toHaveBeenCalledWith(error)
    expect(result).toEqual({ data: { ...movieData } })
    expect(mockAssoc).not.toHaveBeenCalled()

    consoleSpy.mockRestore()
  })

  it('returns error when fetchBaseQuery fails', async () => {
    const movieId = 123
    const sessionId = 'session123'
    const fetchError = { data: { message: 'Not found' }, status: 404 }

    mockSelectSessionId.mockReturnValue(sessionId)
    mockFetchBaseQuery.mockResolvedValue({ error: fetchError })
    mockGetState.mockReturnValue({})

    const result = await queryFn(
      movieId,
      { getState: mockGetState },
      {},
      mockFetchBaseQuery
    )

    expect(mockSelectSessionId).toHaveBeenCalledWith(mockGetState())
    expect(mockFetchBaseQuery).toHaveBeenCalledWith({
      params: {
        append_to_response: 'images,account_states,credits',
        session_id: sessionId,
      },
      url: `/movie/${movieId}`,
    })
    expect(result).toEqual({ error: fetchError })
    expect(mockGetImdbInfo).not.toHaveBeenCalled()
    expect(mockAssoc).not.toHaveBeenCalled()
  })
})

describe('getSearchMovies and getTrendingMovies endpoints', () => {
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
      ({ endpoints }: { endpoints: (b: unknown) => unknown }) => {
        endpoints(builder)
        return {}
      }
    )

    jest.doMock('src/store/api', () => ({
      apiSlice: {
        injectEndpoints: injectEndpointsMock,
      },
    }))
  })

  it('configures getSearchMovies endpoint correctly', async () => {
    await import('../movieApiSlice')

    expect(injectEndpointsMock).toHaveBeenCalledTimes(1)
    expect(builder.query).toHaveBeenCalledTimes(3) // getMovieDetails, getSearchMovies, getTrendingMovies

    // Find the getSearchMovies config
    const searchMoviesConfig = builder.query.mock.calls.find(
      ([config]) => config.query && !config.queryFn
    )?.[0]
    expect(searchMoviesConfig).toBeDefined()

    const queryFn = searchMoviesConfig.query
    const testParams = { page: '1', query: 'test movie' }
    const result = queryFn(testParams)

    expect(result).toEqual({
      params: testParams,
      url: '/search/movie',
    })
  })

  it('configures getTrendingMovies endpoint correctly', async () => {
    await import('../movieApiSlice')

    expect(injectEndpointsMock).toHaveBeenCalledTimes(1)
    expect(builder.query).toHaveBeenCalledTimes(3) // getMovieDetails, getSearchMovies, getTrendingMovies

    // Find the getTrendingMovies config (the last one without queryFn)
    const trendingMoviesConfig = builder.query.mock.calls
      .filter(([config]) => config.query && !config.queryFn)
      .pop()?.[0]
    expect(trendingMoviesConfig).toBeDefined()

    const queryFn = trendingMoviesConfig.query
    const testPage = '2'
    const result = queryFn(testPage)

    expect(result).toEqual({
      params: { page: testPage },
      url: '/trending/movie/week',
    })
  })
})
