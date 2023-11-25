import { fireEvent, render, screen } from '@testing-library/react'
import { mergeDeepRight } from 'ramda'
import { mockMovieDetail } from 'src/__mocks__/mockMovie'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import Movie from '../component'
import useContainer from '../hook'
import { MovieDetailHook } from '../types'

const mockedHook: MovieDetailHook = {
  error: null,
  handleFavoriteClick: jest.fn(),
  handleWatchlistClick: jest.fn(),
  loading: false,
  movie: mockMovieDetail,
  popoverOpen: false,
  setPopoverOpen: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('MovieDetail component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Movie />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleFavoriteClick" when button clicked', () => {
    render(<Movie />, { wrapper: Wrapper })
    const button = screen.getByTestId('addToFavoriteBtn')
    fireEvent.click(button)

    expect(mockedHook.handleFavoriteClick).toHaveBeenCalled()
  })

  it('should call "handleWatchlistClick" when button clicked', () => {
    render(<Movie />, { wrapper: Wrapper })
    const button = screen.getByTestId('addToWatchlistBtn')
    fireEvent.click(button)

    expect(mockedHook.handleWatchlistClick).toHaveBeenCalled()
  })

  it('should call "setPopoverOpen" when popover clicked', () => {
    render(<Movie />, { wrapper: Wrapper })
    const popover = screen.getByTestId('addMovieToListPopover')
    fireEvent.click(popover)

    expect(mockedHook.setPopoverOpen).toHaveBeenCalled()
  })

  it('should match snapshot with other data', () => {
    jest.mocked(useContainer).mockReturnValueOnce(
      mergeDeepRight(mockedHook, {
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
      mergeDeepRight(mockedHook, {
        popoverOpen: true
      }) as MovieDetailHook
    )
    const { asFragment } = render(<Movie />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with empty movie', () => {
    mockedHook.movie = undefined
    const { asFragment } = render(<Movie />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    mockedHook.loading = true
    const { asFragment } = render(<Movie />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with error', () => {
    mockedHook.loading = false
    mockedHook.error = 'Something went wrong!'
    const { asFragment } = render(<Movie />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
