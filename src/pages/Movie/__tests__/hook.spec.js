import { useParams } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { changeMovieInFavorites, changeMovieInWatchlist, fetchMovie } from 'src/state/movie/actions'
import useContainer from '../hook'

jest.mock('src/state/movie/selectors', () => ({
  movieSelector: jest.fn(() => ({
    accountStates: {
      favorite: false,
      watchlist: false
    }
  })),
  movieLoadingSelector: jest.fn(() => true),
  movieErrorSelector: jest.fn(() => null)
}))

describe('Movie useContainer hook', () => {
  let result = null
  useParams.mockReturnValue({ movieId: 123 })

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
