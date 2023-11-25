import { act, renderHook } from '@testing-library/react'
import { useParams } from 'react-router-dom'
import { mockMovieDetail } from 'src/__mocks__/mockMovie'
import { dispatch } from 'src/__mocks__/react-redux'
import { showNotification } from 'src/store/app/actions'
import * as listsActions from 'src/store/lists/actions'
import * as movieActions from 'src/store/movie/actions'
import * as movieSelectors from 'src/store/movie/selectors'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({ movieId: '123' }))
}))

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'test/id')
}))

describe('MovieDetail useContainer hook', () => {
  const selectMovieById = jest
    .spyOn(movieSelectors, 'selectMovieById')
    .mockReturnValue(mockMovieDetail)

  it('should match snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should match snapshot without params', () => {
    jest.mocked(useParams).mockReturnValueOnce({})
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleFavoriteClick" method', () => {
    const changeMovieInFavorite = jest.spyOn(
      movieActions,
      'changeMovieInFavorite'
    )
    const notification = showNotification({
      messageText: 'test/title added to Favorite'
    })
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handleFavoriteClick()
    })

    expect(changeMovieInFavorite).toHaveBeenCalledWith({
      inFavorite: true,
      movieId: '123'
    })
    expect(dispatch).toHaveBeenCalledWith(notification)
  })

  it('should check "handleWatchlistClick" method', () => {
    const changeMovieInWatchlist = jest.spyOn(
      movieActions,
      'changeMovieInWatchlist'
    )
    const notification = showNotification({
      messageText: 'test/title added to Watchlist'
    })
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handleWatchlistClick()
    })

    expect(changeMovieInWatchlist).toHaveBeenCalledWith({
      inWatchlist: true,
      movieId: '123'
    })
    expect(dispatch).toHaveBeenCalledWith(notification)
  })

  it('should check "useEffect" method', () => {
    const fetchMovieDetail = jest.spyOn(movieActions, 'fetchMovieDetail')
    const fetchLists = jest.spyOn(listsActions, 'fetchLists')
    selectMovieById.mockReturnValueOnce(undefined)
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalled()
    expect(fetchMovieDetail).toHaveBeenCalledWith('123')
    expect(fetchLists).toHaveBeenCalledWith('1')
  })
})
