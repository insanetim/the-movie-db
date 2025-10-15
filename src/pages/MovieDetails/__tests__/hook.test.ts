import { act } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import mockAccount from 'src/__mocks__/mockAccount'
import { mockMovieDetailsExtended } from 'src/__mocks__/mockMovie'
import * as createdListsActions from 'src/store/createdLists/actions'
import { showNotification } from 'src/store/features/app'
import * as reactRedux from 'src/store/hooks'
import * as movieDetailsActions from 'src/store/movieDetails/actions'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(() => ({ movieSlug: '1234-test-movie' })),
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => 'test/id',
}))

const mockDispatch = jest.fn()
jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)

describe('MovieDetails useContainer hook', () => {
  const mockState = {
    auth: {
      _persist: {
        rehydrated: true,
        version: -1,
      },
      account: mockAccount,
      isAuthenticated: true,
    },
    createdLists: {
      data: null,
      error: null,
      loading: true,
    },
    movieDetails: {
      entities: {
        [mockMovieDetailsExtended.id]: mockMovieDetailsExtended,
      },
      error: null,
      ids: [mockMovieDetailsExtended.id],
      loading: false,
    },
  }

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handlePopoverMouseEnter" method', () => {
    const fetchLists = jest.spyOn(createdListsActions, 'fetchLists')

    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    act(() => {
      result.current.handlePopoverMouseEnter()
    })

    expect(mockDispatch).toHaveBeenCalled()
    expect(fetchLists).toHaveBeenCalledWith('1')
  })

  it('should check "handlePopoverMouseEnter" method with other params', () => {
    const mockState = {
      auth: {
        _persist: {
          rehydrated: true,
          version: -1,
        },
        account: null,
        isAuthenticated: true,
      },
      createdLists: {
        data: null,
        error: null,
        loading: true,
      },
      movieDetails: {
        entities: {
          [mockMovieDetailsExtended.id]: mockMovieDetailsExtended,
        },
        error: null,
        ids: [mockMovieDetailsExtended.id],
        loading: false,
      },
    }

    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    act(() => {
      result.current.handlePopoverMouseEnter()
    })

    expect(mockDispatch).not.toHaveBeenCalled()
  })

  it('should check "handleFavoriteClick" method', () => {
    const changeMovieInFavorite = jest.spyOn(
      movieDetailsActions,
      'changeMovieInFavorite'
    )
    const notification = showNotification({
      message: 'test/title added to Favorite',
    })

    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    act(() => {
      result.current.handleFavoriteClick()
    })

    expect(changeMovieInFavorite).toHaveBeenCalledWith({
      inFavorite: true,
      movieId: 1234,
    })
    expect(mockDispatch).toHaveBeenCalledWith(notification)
  })

  it('should check "handleWatchlistClick" method', () => {
    const changeMovieInWatchlist = jest.spyOn(
      movieDetailsActions,
      'changeMovieInWatchlist'
    )
    const notification = showNotification({
      message: 'test/title added to Watchlist',
    })

    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    act(() => {
      result.current.handleWatchlistClick()
    })

    expect(changeMovieInWatchlist).toHaveBeenCalledWith({
      inWatchlist: true,
      movieId: 1234,
    })
    expect(mockDispatch).toHaveBeenCalledWith(notification)
  })

  it('should check "handleGoToCast" method', () => {
    const { result } = renderHookWithWrapper(useContainer)

    act(() => {
      result.current.handleGoToCast()
    })

    expect(navigate).toHaveBeenCalledWith('cast')
  })

  it('should check "useEffect" method', () => {
    const mockState = {
      auth: {
        _persist: {
          rehydrated: true,
          version: -1,
        },
        account: mockAccount,
        isAuthenticated: true,
      },
      createdLists: {
        data: null,
        error: null,
        loading: true,
      },
      movieDetails: {
        entities: {},
        error: null,
        ids: [],
        loading: false,
      },
    }
    const fetchMovieDetails = jest.spyOn(
      movieDetailsActions,
      'fetchMovieDetails'
    )

    renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    expect(mockDispatch).toHaveBeenCalled()
    expect(fetchMovieDetails).toHaveBeenCalledWith(1234)
  })
})
