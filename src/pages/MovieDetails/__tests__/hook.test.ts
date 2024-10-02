import { act } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import mockAccount from 'src/__mocks__/mockAccount'
import { mockMovieDetailsExtended } from 'src/__mocks__/mockMovie'
import { showNotification } from 'src/store/app/actions'
import * as createdListsActions from 'src/store/createdLists/actions'
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

describe('MovieDetails useContainer hook', () => {
  const mockDispatch = jest.fn()
  jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)
  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector')

  it('should match snapshot', () => {
    useSelectorMock
      .mockReturnValueOnce(mockAccount)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(mockMovieDetailsExtended)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(null)

    const { result } = renderHookWithWrapper(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handlePopoverMouseEnter" method', () => {
    useSelectorMock
      .mockReturnValueOnce(mockAccount)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(mockMovieDetailsExtended)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(null)
    const fetchLists = jest.spyOn(createdListsActions, 'fetchLists')

    const { result } = renderHookWithWrapper(useContainer)

    act(() => {
      result.current.handlePopoverMouseEnter()
    })

    expect(mockDispatch).toHaveBeenCalled()
    expect(fetchLists).toHaveBeenCalledWith('1')
  })

  it('should check "handlePopoverMouseEnter" method with other params', () => {
    useSelectorMock
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(mockMovieDetailsExtended)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(null)

    const { result } = renderHookWithWrapper(useContainer)

    act(() => {
      result.current.handlePopoverMouseEnter()
    })

    expect(mockDispatch).not.toHaveBeenCalled()
  })

  it('should check "handleFavoriteClick" method', () => {
    useSelectorMock
      .mockReturnValueOnce(mockAccount)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(mockMovieDetailsExtended)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(null)
    const changeMovieInFavorite = jest.spyOn(
      movieDetailsActions,
      'changeMovieInFavorite'
    )
    const notification = showNotification({
      message: 'test/title added to Favorite',
    })

    const { result } = renderHookWithWrapper(useContainer)

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
    useSelectorMock
      .mockReturnValueOnce(mockAccount)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(mockMovieDetailsExtended)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(null)
    const changeMovieInWatchlist = jest.spyOn(
      movieDetailsActions,
      'changeMovieInWatchlist'
    )
    const notification = showNotification({
      message: 'test/title added to Watchlist',
    })
    const { result } = renderHookWithWrapper(useContainer)

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
    useSelectorMock
      .mockReturnValueOnce(mockAccount)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(null)
    const fetchMovieDetails = jest.spyOn(
      movieDetailsActions,
      'fetchMovieDetails'
    )

    renderHookWithWrapper(useContainer)

    expect(mockDispatch).toHaveBeenCalled()
    expect(fetchMovieDetails).toHaveBeenCalledWith(1234)
  })
})
