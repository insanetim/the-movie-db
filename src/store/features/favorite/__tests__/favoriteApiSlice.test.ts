// favoriteApiSlice.test.ts
import { MutationResponse } from 'src/interfaces/global.interface'
import { IMoviesList } from 'src/interfaces/movie.interface'
import { RootState } from 'src/store'
import { apiSlice } from 'src/store/api'

import { AddToFavoriteReq } from './types'

// Top-level mocks
jest.mock('../auth')
jest.mock('../movie')
jest.mock('src/store/api')

describe('favoriteApiSlice', () => {
  let mockEnhanceEndpoints: jest.Mock
  let mockInjectEndpoints: jest.Mock
  let mockUpdateQueryData: jest.Mock

  const mockAccount = {
    id: 123,
    username: 'testuser',
  }

  const mockSessionId = 'test-session-id'

  const mockRootState = {
    auth: {
      account: mockAccount,
      sessionId: mockSessionId,
    },
  } as RootState

  beforeEach(() => {
    jest.clearAllMocks()

    // Set up mock implementations
    const authModule = jest.mocked(require('../auth'))
    authModule.selectAccount.mockReturnValue(mockAccount)
    authModule.selectSessionId.mockReturnValue(mockSessionId)

    const movieModule = jest.mocked(require('../movie'))
    movieModule.movieApiSlice = {
      util: {
        updateQueryData: jest.fn(),
      },
    }

    const apiModule = jest.mocked(require('src/store/api'))
    apiModule.apiSlice = {
      enhanceEndpoints: jest.fn().mockReturnThis(),
      injectEndpoints: jest.fn(),
    }

    mockEnhanceEndpoints = apiModule.apiSlice.enhanceEndpoints as jest.Mock
    mockInjectEndpoints = apiModule.apiSlice.injectEndpoints as jest.Mock
    mockUpdateQueryData = movieModule.movieApiSlice.util.updateQueryData as jest.Mock
  })

  it('should enhance endpoints with FavoriteMovies tag', () => {
    expect(mockEnhanceEndpoints).toHaveBeenCalledWith({
      addTagTypes: ['FavoriteMovies'],
    })
  })

  it('should inject endpoints correctly', () => {
    expect(mockInjectEndpoints).toHaveBeenCalledWith({
      endpoints: expect.any(Function),
    })
  })

  describe('endpoints', () => {
    let endpoints: any

    beforeEach(() => {
      const endpointsBuilder = mockInjectEndpoints.mock.calls[0][0].endpoints
      const builder = {
        mutation: jest.fn(),
        query: jest.fn(),
      }
      endpoints = endpointsBuilder(builder)
    })

    it('should have addToFavorite mutation', () => {
      expect(endpoints.addToFavorite).toBeDefined()
    })

    it('should have getFavoriteMovies query', () => {
      expect(endpoints.getFavoriteMovies).toBeDefined()
    })
  })

  describe('addToFavorite mutation', () => {
    let mutationConfig: any
    let mockDispatch: jest.Mock
    let mockQueryFulfilled: Promise<any>

    beforeEach(() => {
      const endpointsBuilder = mockInjectEndpoints.mock.calls[0][0].endpoints
      const builder = {
        mutation: jest.fn().mockImplementation((config) => config),
        query: jest.fn(),
      }
      endpointsBuilder(builder)
      mutationConfig = builder.mutation.mock.calls[0][0]

      mockDispatch = jest.fn()
      mockQueryFulfilled = Promise.resolve()
    })

    it('should be configured as a mutation', () => {
      expect(mutationConfig).toBeDefined()
    })

    it('should invalidate FavoriteMovies tag', () => {
      expect(mutationConfig.invalidatesTags).toEqual(['FavoriteMovies'])
    })

    describe('onQueryStarted', () => {
      const mockArgs: AddToFavoriteReq = {
        inFavorite: true,
        movieId: 12345,
      }

      it('should update movie details optimistically', async () => {
        const mockPatchResult = {
          undo: jest.fn(),
        }
        mockUpdateQueryData.mockReturnValue(mockPatchResult)

        await mutationConfig.onQueryStarted(
          mockArgs,
          { dispatch: mockDispatch, queryFulfilled: mockQueryFulfilled }
        )

        expect(mockUpdateQueryData).toHaveBeenCalledWith(
          'getMovieDetails',
          mockArgs.movieId,
          expect.any(Function)
        )

        // Test the update function
        const updateFunction = mockUpdateQueryData.mock.calls[0][2]
        const mockDraft = {
          account_states: {
            favorite: false,
          },
        }
        updateFunction(mockDraft)
        expect(mockDraft.account_states.favorite).toBe(mockArgs.inFavorite)
      })

      it('should undo update on query failure', async () => {
        const mockPatchResult = {
          undo: jest.fn(),
        }
        mockUpdateQueryData.mockReturnValue(mockPatchResult)
        const mockFailedQueryFulfilled = Promise.reject(new Error('API Error'))

        await expect(
          mutationConfig.onQueryStarted(
            mockArgs,
            { dispatch: mockDispatch, queryFulfilled: mockFailedQueryFulfilled }
          )
        ).rejects.toThrow('API Error')

        expect(mockPatchResult.undo).toHaveBeenCalled()
      })

      it('should not undo update on query success', async () => {
        const mockPatchResult = {
          undo: jest.fn(),
        }
        mockUpdateQueryData.mockReturnValue(mockPatchResult)

        await mutationConfig.onQueryStarted(
          mockArgs,
          { dispatch: mockDispatch, queryFulfilled: mockQueryFulfilled }
        )

        expect(mockPatchResult.undo).not.toHaveBeenCalled()
      })
    })

    describe('queryFn', () => {
      it('should make correct API call for adding to favorites', async () => {
        const mockFetchBaseQuery = jest.fn().mockResolvedValue({
          data: { status_code: 12, status_message: 'Success', success: true },
        })

        const result = await mutationConfig.queryFn(
          { inFavorite: true, movieId: 12345 },
          { getState: () => mockRootState },
          {},
          mockFetchBaseQuery
        )

        expect(mockFetchBaseQuery).toHaveBeenCalledWith({
          body: {
            favorite: true,
            media_id: 12345,
            media_type: 'movie',
          },
          method: 'post',
          params: { session_id: mockSessionId },
          url: `/account/${mockAccount.id}/favorite`,
        })

        expect(result).toEqual({
          data: { status_code: 12, status_message: 'Success', success: true },
        })
      })

      it('should make correct API call for removing from favorites', async () => {
        const mockFetchBaseQuery = jest.fn().mockResolvedValue({
          data: { status_code: 13, status_message: 'Removed', success: true },
        })

        const result = await mutationConfig.queryFn(
          { inFavorite: false, movieId: 12345 },
          { getState: () => mockRootState },
          {},
          mockFetchBaseQuery
        )

        expect(mockFetchBaseQuery).toHaveBeenCalledWith({
          body: {
            favorite: false,
            media_id: 12345,
            media_type: 'movie',
          },
          method: 'post',
          params: { session_id: mockSessionId },
          url: `/account/${mockAccount.id}/favorite`,
        })

        expect(result).toEqual({
          data: { status_code: 13, status_message: 'Removed', success: true },
        })
      })

      it('should return error when API call fails', async () => {
        const mockError = { data: 'Internal Server Error', status: 500 }
        const mockFetchBaseQuery = jest.fn().mockResolvedValue({
          error: mockError,
        })

        const result = await mutationConfig.queryFn(
          { inFavorite: true, movieId: 12345 },
          { getState: () => mockRootState },
          {},
          mockFetchBaseQuery
        )

        expect(result).toEqual({ error: mockError })
      })

      it('should handle missing account', async () => {
        const authModule = jest.mocked(require('../auth'))
        authModule.selectAccount.mockReturnValue(null)

        const mockFetchBaseQuery = jest.fn()

        await expect(
          mutationConfig.queryFn(
            { inFavorite: true, movieId: 12345 },
            { getState: () => mockRootState },
            {},
            mockFetchBaseQuery
          )
        ).rejects.toThrow() // or handle based on your actual error handling
      })
    })
  })

  describe('getFavoriteMovies query', () => {
    let queryConfig: any

    beforeEach(() => {
      const endpointsBuilder = mockInjectEndpoints.mock.calls[0][0].endpoints
      const builder = {
        mutation: jest.fn(),
        query: jest.fn().mockImplementation((config) => config),
      }
      endpointsBuilder(builder)
      queryConfig = builder.query.mock.calls[0][0]
    })

    it('should be configured as a query', () => {
      expect(queryConfig).toBeDefined()
    })

    it('should provide FavoriteMovies tag', () => {
      expect(queryConfig.providesTags).toEqual(['FavoriteMovies'])
    })

    describe('queryFn', () => {
      it('should make correct API call for fetching favorite movies', async () => {
        const mockMoviesList: IMoviesList = {
          page: 1,
          results: [
            {
              id: 1,
              poster_path: '/test.jpg',
              release_date: '2023-01-01',
              title: 'Test Movie',
              vote_average: 8.5,
            },
          ],
          total_pages: 1,
          total_results: 1,
        }

        const mockFetchBaseQuery = jest.fn().mockResolvedValue({
          data: mockMoviesList,
        })

        const result = await queryConfig.queryFn(
          '1',
          { getState: () => mockRootState },
          {},
          mockFetchBaseQuery
        )

        expect(mockFetchBaseQuery).toHaveBeenCalledWith({
          params: { page: '1', session_id: mockSessionId },
          url: `/account/${mockAccount.id}/favorite/movies`,
        })

        expect(result).toEqual({ data: mockMoviesList })
      })

      it('should return error when API call fails', async () => {
        const mockError = { data: 'Not Found', status: 404 }
        const mockFetchBaseQuery = jest.fn().mockResolvedValue({
          error: mockError,
        })

        const result = await queryConfig.queryFn(
          '1',
          { getState: () => mockRootState },
          {},
          mockFetchBaseQuery
        )

        expect(result).toEqual({ error: mockError })
      })

      it('should handle different page numbers', async () => {
        const mockFetchBaseQuery = jest.fn().mockResolvedValue({
          data: { page: 2, results: [], total_pages: 2, total_results: 0 },
        })

        await queryConfig.queryFn(
          '2',
          { getState: () => mockRootState },
          {},
          mockFetchBaseQuery
        )

        expect(mockFetchBaseQuery).toHaveBeenCalledWith({
          params: { page: '2', session_id: mockSessionId },
          url: `/account/${mockAccount.id}/favorite/movies`,
        })
      })
    })
  })

  describe('exports', () => {
    it('should export hooks correctly', async () => {
      // Import the module to test exports
      const { favoriteApiSlice } = await import('./favoriteApiSlice')

      const {
        useAddToFavoriteMutation,
        useGetFavoriteMoviesQuery,
      } = favoriteApiSlice

      expect(useAddToFavoriteMutation).toBeDefined()
      expect(useGetFavoriteMoviesQuery).toBeDefined()
    })
  })
})
