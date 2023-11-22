import { fireEvent, render } from '@testing-library/react'
import { mergeDeepRight } from 'ramda'
import { mockMovieDetail } from 'src/__mocks__/mockMovie'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import Movie from '../component'
import useContainer from '../hook'
import { MovieDetailHook } from '../types'

const mockedHookData: MovieDetailHook = {
  error: null,
  handleFavoriteClick: jest.fn(),
  handleWatchlistClick: jest.fn(),
  loading: false,
  movie: mockMovieDetail,
  popoverOpen: false,
  setPopoverOpen: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('MovieDetail component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Movie />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('handles setPopoverOpen', () => {
    const { getByTestId } = render(<Movie />, { wrapper: Wrapper })

    fireEvent.click(getByTestId('addMovieToListPopover'))

    expect(mockedHookData.setPopoverOpen).toHaveBeenCalled()
  })

  it('should match snapshot with other data', () => {
    jest.mocked(useContainer).mockReturnValueOnce(
      mergeDeepRight(mockedHookData, {
        movie: {
          accountStates: {
            favorite: true,
            watchlist: true
          },
          release_date: undefined
        }
      }) as MovieDetailHook
    )
    const { asFragment } = render(<Movie />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with open popover', () => {
    jest.mocked(useContainer).mockReturnValueOnce(
      mergeDeepRight(mockedHookData, {
        popoverOpen: true
      }) as MovieDetailHook
    )
    const { asFragment } = render(<Movie />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with empty movie', () => {
    mockedHookData.movie = undefined
    const { asFragment } = render(<Movie />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    mockedHookData.loading = true
    const { asFragment } = render(<Movie />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = 'Something went wrong!'
    const { asFragment } = render(<Movie />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
