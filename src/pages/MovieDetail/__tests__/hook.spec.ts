import { act, renderHook } from '@testing-library/react'
import { useParams } from 'react-router-dom'
import { mockMovieDetail } from 'src/__mocks__/mockMovie'
import { dispatch } from 'src/__mocks__/react-redux'
import { changeMovieInFavorite, changeMovieInWatchlist, fetchMovie } from 'src/store/movie/actions'

import useContainer from '../hook'

jest.mock('src/store/movie/actions')

jest.mock('src/store/movie/selectors', () => ({
  movieErrorSelector: jest.fn(() => null),
  movieLoadingSelector: jest.fn(() => true),
  movieSelector: jest.fn(() => mockMovieDetail)
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

    expect(dispatch).toHaveBeenCalledWith(changeMovieInFavorite({ inFavorite: true, movieId: 123 }))
  })

  it('checks `handleWatchlistClick` method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handleWatchlistClick()
    })

    expect(dispatch).toHaveBeenCalledWith(changeMovieInWatchlist({ inWatchlist: true, movieId: 123 }))
  })

  it('checks `useEffect` method', () => {
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalledWith(fetchMovie(123))
  })
})
