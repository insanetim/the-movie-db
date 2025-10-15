describe('apiSlice configuration', () => {
  const ORIGINAL_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...ORIGINAL_ENV }
    process.env.TMDB_API_URL = 'https://api.themoviedb.org/3'
    process.env.TMDB_ACCESS_TOKEN_AUTH = 'test-token'
  })

  afterAll(() => {
    process.env = ORIGINAL_ENV
  })

  it('configures fetchBaseQuery with baseUrl and prepares Authorization header', async () => {
    const mockInnerBaseQuery = jest.fn()
    const mockFetchBaseQuery = jest.fn(() => mockInnerBaseQuery)

    jest.doMock('@reduxjs/toolkit/query', () => {
      const actual = jest.requireActual('@reduxjs/toolkit/query')
      return {
        ...actual,
        fetchBaseQuery: mockFetchBaseQuery,
      }
    })

    const { apiSlice } = await import('../apiSlice')
    expect(apiSlice).toBeDefined()

    expect(mockFetchBaseQuery).toHaveBeenCalledTimes(1)
    const [firstCall] = mockFetchBaseQuery.mock.calls
    const [options] = firstCall as unknown as [
      {
        baseUrl: string
        prepareHeaders: (h: { set: (k: string, v: string) => void }) => unknown
      },
    ]

    expect(options.baseUrl).toBe('https://api.themoviedb.org/3')

    const set = jest.fn()
    options.prepareHeaders({ set } as unknown as Headers)
    expect(set).toHaveBeenCalledWith('Authorization', 'Bearer test-token')
  })
})
