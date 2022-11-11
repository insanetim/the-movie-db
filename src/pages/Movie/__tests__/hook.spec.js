import React from 'react'
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
  }))
}))

describe('Movie useContainer hook', () => {
  let result = null
  const setState = jest.fn()
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation(initialState => [initialState, setState])
  useParams.mockReturnValue({ movieId: 1 })

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

    expect(dispatch).toHaveBeenCalledWith(changeMovieInFavorites({ movieId: 1, inFavorites: true }))
  })

  it('checks `handleWatchlistClick` method', () => {
    act(() => {
      result.current.handleWatchlistClick()
    })

    expect(dispatch).toHaveBeenCalledWith(changeMovieInWatchlist({ movieId: 1, inWatchlist: true }))
  })

  it('checks `useEffect` method', () => {
    ;({ result } = renderHook(useContainer))
    act(() => {
      result.current.onFinish()
    })

    expect(dispatch).toHaveBeenCalledWith(fetchMovie(1, result.current.onFinish))
    expect(setState).toHaveBeenCalledWith(false)
  })
})
