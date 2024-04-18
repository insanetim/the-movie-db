import { act, renderHook } from '@testing-library/react'
import { useNavigate, useParams } from 'react-router-dom'
import mockAccount from 'src/__mocks__/mockAccount'
import { mockMovieDetailsExtended } from 'src/__mocks__/mockMovie'
import { dispatch } from 'src/__mocks__/react-redux'
import { showNotification } from 'src/store/app/actions'
import * as sessionSelectors from 'src/store/auth/selectors'
import * as createdListsActions from 'src/store/createdLists/actions'
import * as createdListsSelectors from 'src/store/createdLists/selectors'
import * as movieDetailsActions from 'src/store/movieDetails/actions'
import * as movieDetailsSelectors from 'src/store/movieDetails/selectors'

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

jest.mock('src/store/auth/selectors')
jest.mock('src/store/createdLists/selectors')
jest.mock('src/store/movieDetails/selectors')

describe('MovieDetails useContainer hook', () => {
  const accountSelector = jest
    .spyOn(sessionSelectors, 'accountSelector')
    .mockReturnValue(mockAccount)
  jest
    .spyOn(createdListsSelectors, 'createdListsSelector')
    .mockReturnValue(null)
  jest
    .spyOn(movieDetailsSelectors, 'movieDetailsLoadingSelector')
    .mockReturnValue(false)
  jest
    .spyOn(movieDetailsSelectors, 'movieDetailsErrorSelector')
    .mockReturnValue(null)
  const selectMovieById = jest
    .spyOn(movieDetailsSelectors, 'movieDetailsSelector')
    .mockReturnValue(mockMovieDetailsExtended)

  it('should match snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should match snapshot without params', () => {
    jest.mocked(useParams).mockReturnValueOnce({})
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handlePopoverMouseEnter" method', () => {
    const fetchLists = jest.spyOn(createdListsActions, 'fetchLists')
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handlePopoverMouseEnter()
    })

    expect(dispatch).toHaveBeenCalled()
    expect(fetchLists).toHaveBeenCalledWith('1')
  })

  it('should check "handlePopoverMouseEnter" method with other params', () => {
    accountSelector.mockReturnValueOnce(null)
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handlePopoverMouseEnter()
    })

    expect(dispatch).not.toHaveBeenCalled()
  })

  it('should check "handleFavoriteClick" method', () => {
    const changeMovieInFavorite = jest.spyOn(
      movieDetailsActions,
      'changeMovieInFavorite'
    )
    const notification = showNotification({
      message: 'test/title added to Favorite',
    })
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handleFavoriteClick()
    })

    expect(changeMovieInFavorite).toHaveBeenCalledWith({
      inFavorite: true,
      movieId: 1234,
    })
    expect(dispatch).toHaveBeenCalledWith(notification)
  })

  it('should check "handleWatchlistClick" method', () => {
    const changeMovieInWatchlist = jest.spyOn(
      movieDetailsActions,
      'changeMovieInWatchlist'
    )
    const notification = showNotification({
      message: 'test/title added to Watchlist',
    })
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handleWatchlistClick()
    })

    expect(changeMovieInWatchlist).toHaveBeenCalledWith({
      inWatchlist: true,
      movieId: 1234,
    })
    expect(dispatch).toHaveBeenCalledWith(notification)
  })

  it('should check "handleGoToCast" method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handleGoToCast()
    })

    expect(navigate).toHaveBeenCalledWith('cast')
  })

  it('should check "useEffect" method', () => {
    const fetchMovieDetails = jest.spyOn(
      movieDetailsActions,
      'fetchMovieDetails'
    )
    selectMovieById.mockReturnValueOnce(undefined as never)
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalled()
    expect(fetchMovieDetails).toHaveBeenCalledWith(1234)
  })
})
