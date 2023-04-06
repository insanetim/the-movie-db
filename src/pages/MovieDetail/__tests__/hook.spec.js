import { useDispatch } from 'react-redux'
import { act, renderHook } from '@testing-library/react'

import { changeMovieInFavorites, changeMovieInWatchlist, fetchMovie } from 'src/store/movie/actions'
import useContainer from '../hook'

jest.mock('src/store/movie/selectors', () => ({
  movieSelector: jest.fn(() => ({
    accountStates: {
      favorite: false,
      watchlist: false
    }
  })),
  movieLoadingSelector: jest.fn(() => true),
  movieErrorSelector: jest.fn(() => null)
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(fn => fn()),
  useDispatch: jest.fn()
}))
const dispatch = jest.fn()
useDispatch.mockReturnValue(dispatch)

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockImplementation(() => ({ movieId: 123 }))
}))

describe('MovieDetail useContainer hook', () => {
  let result = null

  beforeEach(() => {
    ;({ result } = renderHook(useContainer))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleFavoriteClick` method', () => {
    act(() => {
      result.current.handleFavoriteClick()
    })

    expect(dispatch).toHaveBeenCalledWith(
      changeMovieInFavorites({
        movieId: 123,
        inFavorites: true
      })
    )
  })

  it('checks `handleWatchlistClick` method', () => {
    act(() => {
      result.current.handleWatchlistClick()
    })

    expect(dispatch).toHaveBeenCalledWith(
      changeMovieInWatchlist({
        movieId: 123,
        inWatchlist: true
      })
    )
  })

  it('checks `useEffect` method', () => {
    ;({ result } = renderHook(useContainer))

    expect(dispatch).toHaveBeenCalledWith(fetchMovie(123))
  })
})
