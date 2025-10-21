describe('favoriteApiSlice endpoints', () => {
  const hooksMock = {
    useAddToFavoriteMutation: Symbol('useAddToFavoriteMutation'),
    useGetFavoriteMoviesQuery: Symbol('useGetFavoriteMoviesQuery'),
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

    jest.doMock('src/store/api', () => ({
      apiSlice: {
        enhanceEndpoints: enhanceEndpointsMock,
        injectEndpoints: jest.fn(() => ({})), // Mock for authApiSlice
      },
    }))
  })

  it('configures endpoints with tagTypes and re-exports generated hooks', async () => {
    const module = await import('../favoriteApiSlice')

    expect(enhanceEndpointsMock).toHaveBeenCalledTimes(1)
    expect(enhanceEndpointsMock).toHaveBeenCalledWith(
      expect.objectContaining({ addTagTypes: ['FavoriteMovies'] })
    )

    expect(injectEndpointsMock).toHaveBeenCalledTimes(1)
    expect(injectEndpointsMock).toHaveBeenCalledWith(
      expect.objectContaining({ endpoints: expect.any(Function) })
    )

    expect(builder.mutation).toHaveBeenCalledTimes(1)
    expect(builder.query).toHaveBeenCalledTimes(1)

    const addToFavoriteConfig = builder.mutation.mock.calls[0][0] as {
      invalidatesTags: string[]
      onQueryStarted: (
        arg: { inFavorite: boolean; movieId: number },
        helpers: { dispatch: unknown; queryFulfilled: Promise<unknown> }
      ) => Promise<void>
      queryFn: (
        arg: { inFavorite: boolean; movieId: number },
        api: { getState: () => unknown },
        extra: unknown,
        fetchBaseQuery: (args: unknown) => Promise<unknown>
      ) => Promise<unknown>
    }
    expect(addToFavoriteConfig.invalidatesTags).toEqual(['FavoriteMovies'])
    expect(typeof addToFavoriteConfig.onQueryStarted).toBe('function')
    expect(typeof addToFavoriteConfig.queryFn).toBe('function')

    const getFavoriteMoviesConfig = builder.query.mock.calls[0][0] as {
      providesTags: string[]
      queryFn: (
        page: string,
        api: { getState: () => unknown },
        extra: unknown,
        fetchBaseQuery: (args: unknown) => Promise<unknown>
      ) => Promise<unknown>
    }
    expect(getFavoriteMoviesConfig.providesTags).toEqual(['FavoriteMovies'])
    expect(typeof getFavoriteMoviesConfig.queryFn).toBe('function')

    expect(module.favoriteApiSlice).toBe(hooksMock)
    expect(module.useAddToFavoriteMutation).toBe(
      hooksMock.useAddToFavoriteMutation
    )
    expect(module.useGetFavoriteMoviesQuery).toBe(
      hooksMock.useGetFavoriteMoviesQuery
    )
  })
})
