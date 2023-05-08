import { fireEvent, render } from '@testing-library/react'
import { mergeDeepRight } from 'ramda'

import type { MovieDetailHook } from '../types'
import { mockMovieDetail } from 'src/__mocks__/mockMovie'
import Wrapper from 'src/utils/testHelpers/wrapperMock'
import Movie from '../component'
import useContainer from '../hook'

const mockedHookData: MovieDetailHook = {
  movie: mockMovieDetail,
  loading: false,
  error: null,
  handleFavoriteClick: jest.fn(),
  handleWatchlistClick: jest.fn(),
  popoverOpen: false,
  setPopoverOpen: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('MovieDetail component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Movie />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('handles setPopoverOpen', () => {
    const { getByTestId } = render(<Movie />, { wrapper: Wrapper })

    fireEvent.click(getByTestId('addMovieToListPopover'))

    expect(mockedHookData.setPopoverOpen).toHaveBeenCalled()
  })

  it('matches snapshot with other data', () => {
    jest.mocked(useContainer).mockReturnValueOnce(
      mergeDeepRight(mockedHookData, {
        movie: {
          accountStates: {
            favorite: true,
            watchlist: true
          }
        },
        popoverOpen: true
      }) as MovieDetailHook
    )
    const { asFragment } = render(<Movie />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with empty movie', () => {
    mockedHookData.movie = null
    const { asFragment } = render(<Movie />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    const { asFragment } = render(<Movie />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = 'Something went wrong!'
    const { asFragment } = render(<Movie />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
