import { act, renderHook } from '@testing-library/react'
import { useParams } from 'react-router-dom'
import { mockMovieDetail } from 'src/__mocks__/mockMovie'
import { dispatch } from 'src/__mocks__/react-redux'
import { showNotification } from 'src/store/app/actions'
import { fetchLists } from 'src/store/lists/actions'
import {
  changeMovieInFavorite,
  changeMovieInWatchlist,
  fetchMovieDetail
} from 'src/store/movie/actions'
import { selectMovieById } from 'src/store/movie/selectors'

import useContainer from '../hook'

jest.mock('src/store/movie/actions')

jest.mock('src/store/lists/actions')

jest.mock('src/store/movie/selectors', () => ({
  selectMovieById: jest.fn(() => mockMovieDetail)
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockImplementation(() => ({ movieId: '123' }))
}))

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'nonoid')
}))

describe('MovieDetail useContainer hook', () => {
  it('should match snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should match snapshot without params', () => {
    jest.mocked(useParams).mockReturnValueOnce({})
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check `handleFavoriteClick` method', () => {
    const notification = showNotification({
      messageText: 'test/title added to Favorite'
    })
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handleFavoriteClick()
    })

    expect(dispatch).toHaveBeenCalledWith(
      changeMovieInFavorite({ inFavorite: true, movieId: 123 })
    )
    expect(dispatch).toHaveBeenCalledWith(notification)
  })

  it('should check `handleWatchlistClick` method', () => {
    const notification = showNotification({
      messageText: 'test/title added to Watchlist'
    })
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handleWatchlistClick()
    })

    expect(dispatch).toHaveBeenCalledWith(
      changeMovieInWatchlist({ inWatchlist: true, movieId: 123 })
    )
    expect(dispatch).toHaveBeenCalledWith(notification)
  })

  it('should check `useEffect` method', () => {
    jest.mocked(selectMovieById).mockReturnValueOnce(undefined)
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalledWith(fetchMovieDetail(123))
    expect(dispatch).toHaveBeenCalledWith(fetchLists('1'))
  })
})
