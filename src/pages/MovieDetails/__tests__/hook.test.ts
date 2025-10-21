import { act, renderHook } from '@testing-library/react'
import { useNavigate, useParams } from 'react-router-dom'
import { showNotification } from 'src/store/features/app'
import { selectSessionId } from 'src/store/features/auth'
import { useAddToFavoriteMutation } from 'src/store/features/favorite'
import { usePrefetch } from 'src/store/features/list'
import { useGetMovieDetailsQuery } from 'src/store/features/movie'
import { useAddToWatchlistMutation } from 'src/store/features/watchlist'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import errorMessage from 'src/utils/helpers/errorMessage'
import favoriteMessage from 'src/utils/helpers/favoriteMessage'
import getIdFromSlug from 'src/utils/helpers/getIdFromSlug'
import watchlistMessage from 'src/utils/helpers/watchlistMessage'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}))
jest.mock('src/store/features/app', () => ({
  showNotification: jest.fn((payload: never) => ({
    payload,
    type: 'app/showNotification',
  })),
}))
jest.mock('src/store/features/favorite')
jest.mock('src/store/features/list')
jest.mock('src/store/features/movie')
jest.mock('src/store/features/watchlist')
jest.mock('src/store/hooks')
jest.mock('src/utils/helpers/errorMessage')
jest.mock('src/utils/helpers/favoriteMessage')
jest.mock('src/utils/helpers/getIdFromSlug')
jest.mock('src/utils/helpers/watchlistMessage')

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>
const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>
const mockUseAppDispatch = useAppDispatch as unknown as jest.Mock<
  ReturnType<typeof useAppDispatch>
>
const mockUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>
const mockUseGetMovieDetailsQuery =
  useGetMovieDetailsQuery as jest.MockedFunction<typeof useGetMovieDetailsQuery>
const mockUseAddToFavoriteMutation =
  useAddToFavoriteMutation as jest.MockedFunction<
    typeof useAddToFavoriteMutation
  >
const mockUseAddToWatchlistMutation =
  useAddToWatchlistMutation as jest.MockedFunction<
    typeof useAddToWatchlistMutation
  >
const mockUsePrefetch = usePrefetch as jest.MockedFunction<typeof usePrefetch>
const mockErrorMessage = errorMessage as jest.MockedFunction<
  typeof errorMessage
>
const mockFavoriteMessage = favoriteMessage as jest.MockedFunction<
  typeof favoriteMessage
>
const mockWatchlistMessage = watchlistMessage as jest.MockedFunction<
  typeof watchlistMessage
>
const mockGetIdFromSlug = getIdFromSlug as jest.MockedFunction<
  typeof getIdFromSlug
>
const mockShowNotification = showNotification as jest.MockedFunction<
  typeof showNotification
>

describe('MovieDetails useContainer hook', () => {
  let navigate: jest.Mock
  let dispatch: jest.Mock
  let triggerAddFav: jest.Mock
  let triggerAddWatch: jest.Mock
  let prefetchLists: jest.Mock

  beforeEach(() => {
    // router params and navigation
    mockUseParams.mockReturnValue({ movieSlug: 'some-movie-123' } as never)
    navigate = jest.fn()
    mockUseNavigate.mockReturnValue(navigate as never)
    mockGetIdFromSlug.mockReturnValue('123' as never)

    // store hooks
    dispatch = jest.fn()
    mockUseAppDispatch.mockReturnValue(dispatch as never)
    mockUseAppSelector.mockImplementation((selector: unknown) => {
      if (selector === selectSessionId) return 'sess-1' as never
      return undefined as never
    })

    // helpers
    mockErrorMessage.mockImplementation(err => (err ? 'Mocked Error' : null))
    mockFavoriteMessage.mockImplementation(
      (title, inFavorite) => `${title}:${inFavorite ? 'fav' : 'unfav'}`
    )
    mockWatchlistMessage.mockImplementation(
      (title, inWatchlist) => `${title}:${inWatchlist ? 'wl' : 'unwl'}`
    )
    mockShowNotification.mockImplementation(
      (payload: Parameters<typeof showNotification>[0]) =>
        ({ payload, type: 'app/showNotification' }) as ReturnType<
          typeof showNotification
        >
    )

    // api
    const movie = {
      account_states: { favorite: false, watchlist: true },
      id: 123,
      title: 'Some Movie',
    } as never
    mockUseGetMovieDetailsQuery.mockReturnValue({
      data: movie,
      error: null,
      isLoading: false,
    } as never)

    triggerAddFav = jest.fn()
    triggerAddWatch = jest.fn()
    mockUseAddToFavoriteMutation.mockReturnValue([triggerAddFav] as never)
    mockUseAddToWatchlistMutation.mockReturnValue([triggerAddWatch] as never)

    prefetchLists = jest.fn()
    // usePrefetch returns a prefetch function when called with the endpoint name
    mockUsePrefetch.mockReturnValue(prefetchLists as never)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return values and call query with movie id from slug', () => {
    const { result } = renderHook(() => useContainer())

    expect(result.current.isLoading).toBe(false)
    expect(result.current.movie).toEqual({
      account_states: { favorite: false, watchlist: true },
      id: 123,
      title: 'Some Movie',
    })
    expect(result.current.error).toBeNull()
    expect(result.current.sessionId).toBe('sess-1')
    expect(result.current.popoverOpen).toBe(false)

    expect(mockGetIdFromSlug).toHaveBeenCalledWith('some-movie-123')
    expect(mockUseGetMovieDetailsQuery).toHaveBeenCalledWith('123')
  })

  it('should reflect loading state', () => {
    mockUseGetMovieDetailsQuery.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    } as never)

    const { result } = renderHook(() => useContainer())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.movie).toBeUndefined()
  })

  it('should map error using errorMessage helper', () => {
    const apiError = { status: 500 } as never
    mockUseGetMovieDetailsQuery.mockReturnValue({
      data: undefined,
      error: apiError,
      isLoading: false,
    } as never)
    mockErrorMessage.mockReturnValue('Some error')

    const { result } = renderHook(() => useContainer())

    expect(mockErrorMessage).toHaveBeenCalledWith(apiError)
    expect(result.current.error).toBe('Some error')
  })

  it('should navigate to cast on handleGoToCast', () => {
    const { result } = renderHook(() => useContainer())

    act(() => {
      result.current.handleGoToCast()
    })

    expect(navigate).toHaveBeenCalledWith('cast')
  })

  it('should prefetch lists on popover mouse enter', () => {
    const { result } = renderHook(() => useContainer())

    act(() => {
      result.current.handlePopoverMouseEnter()
    })

    expect(prefetchLists).toHaveBeenCalledWith('1')
  })

  it('should toggle favorite and dispatch notification', () => {
    const { result } = renderHook(() => useContainer())

    act(() => {
      result.current.handleFavoriteClick()
    })

    expect(triggerAddFav).toHaveBeenCalledWith({
      inFavorite: true,
      movieId: '123',
    })
    expect(mockFavoriteMessage).toHaveBeenCalledWith('Some Movie', true)
    expect(dispatch).toHaveBeenCalledWith({
      payload: { message: 'Some Movie:fav' },
      type: 'app/showNotification',
    })
  })

  it('should toggle watchlist and dispatch notification', () => {
    const movie = {
      account_states: { favorite: false, watchlist: false },
      id: 123,
      title: 'Some Movie',
    } as never
    mockUseGetMovieDetailsQuery.mockReturnValue({
      data: movie,
      error: null,
      isLoading: false,
    } as never)

    const { result } = renderHook(() => useContainer())

    act(() => {
      result.current.handleWatchlistClick()
    })

    expect(triggerAddWatch).toHaveBeenCalledWith({
      inWatchlist: true,
      movieId: '123',
    })
    expect(mockWatchlistMessage).toHaveBeenCalledWith('Some Movie', true)
    expect(dispatch).toHaveBeenCalledWith({
      payload: { message: 'Some Movie:wl' },
      type: 'app/showNotification',
    })
  })

  it('should allow changing popover open state via setPopoverOpen', () => {
    const { result } = renderHook(() => useContainer())

    act(() => {
      result.current.setPopoverOpen(true)
    })

    expect(result.current.popoverOpen).toBe(true)
  })
})
