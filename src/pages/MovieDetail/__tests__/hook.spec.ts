import { useParams } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react'

import { mockMovieDetail } from 'src/__mocks__/mockMovie'
import { dispatch } from 'src/__mocks__/react-redux'
import { changeMovieInFavorite, changeMovieInWatchlist, fetchMovie } from 'src/store/movie/actions'
import useContainer from '../hook'

jest.mock('src/store/movie/actions')

jest.mock('src/store/movie/selectors', () => ({
  movieSelector: jest.fn(() => mockMovieDetail),
  movieLoadingSelector: jest.fn(() => true),
  movieErrorSelector: jest.fn(() => null)
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockImplementation(() => ({ movieId: '123' }))
}))

describe('MovieDetail useContainer hook', () => {
  it('matches snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('matches snapshot without params', () => {
    jest.mocked(useParams).mockReturnValueOnce({})
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleFavoriteClick` method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handleFavoriteClick()
    })

    expect(dispatch).toHaveBeenCalledWith(changeMovieInFavorite({ movieId: 123, inFavorite: true }))
  })

  it('checks `handleWatchlistClick` method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handleWatchlistClick()
    })

    expect(dispatch).toHaveBeenCalledWith(changeMovieInWatchlist({ movieId: 123, inWatchlist: true }))
  })

  it('checks `useEffect` method', () => {
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalledWith(fetchMovie(123))
  })
})
