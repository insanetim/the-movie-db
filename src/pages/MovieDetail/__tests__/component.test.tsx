import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mergeDeepRight } from 'ramda'
import { mockMovieDetailExtended } from 'src/__mocks__/mockMovie'
import renderWithWrapper from 'src/utils/testHelpers/renderWithWrapper'

import Movie from '../component'
import useContainer from '../hook'
import { MovieDetailHook } from '../types'

const mockedHook: MovieDetailHook = {
  error: null,
  handleFavoriteClick: jest.fn(),
  handleWatchlistClick: jest.fn(),
  loading: false,
  movie: mockMovieDetailExtended,
  popoverOpen: false,
  setPopoverOpen: jest.fn(),
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

jest.mock('src/store/lists/selectors', () => ({
  listsSelector: () => null,
}))

describe('MovieDetail component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<Movie />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleFavoriteClick" when button clicked', async () => {
    renderWithWrapper(<Movie />)

    const user = userEvent.setup()
    const button = screen.getByTestId('addToFavoriteBtn')
    await user.click(button)

    expect(mockedHook.handleFavoriteClick).toHaveBeenCalled()
  })

  it('should call "handleWatchlistClick" when button clicked', async () => {
    renderWithWrapper(<Movie />)

    const user = userEvent.setup()
    const button = screen.getByTestId('addToWatchlistBtn')
    await user.click(button)

    expect(mockedHook.handleWatchlistClick).toHaveBeenCalled()
  })

  it('should call "setPopoverOpen" when popover clicked', async () => {
    renderWithWrapper(<Movie />)

    const user = userEvent.setup()
    const popover = screen.getByTestId('addMovieToListPopover')
    await user.click(popover)

    expect(mockedHook.setPopoverOpen).toHaveBeenCalled()
  })

  it('should match snapshot with other data', () => {
    jest.mocked(useContainer).mockReturnValueOnce(
      mergeDeepRight(mockedHook, {
        movie: {
          accountStates: {
            favorite: true,
            watchlist: true,
          },
          release_date: undefined,
        },
      }) as MovieDetailHook
    )
    const { asFragment } = renderWithWrapper(<Movie />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with open popover', () => {
    jest.mocked(useContainer).mockReturnValueOnce(
      mergeDeepRight(mockedHook, {
        popoverOpen: true,
      }) as MovieDetailHook
    )
    const { asFragment } = renderWithWrapper(<Movie />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with empty movie', () => {
    mockedHook.movie = undefined
    const { asFragment } = renderWithWrapper(<Movie />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    mockedHook.loading = true
    const { asFragment } = renderWithWrapper(<Movie />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with error', () => {
    mockedHook.loading = false
    mockedHook.error = 'Something went wrong!'
    const { asFragment } = renderWithWrapper(<Movie />)

    expect(asFragment()).toMatchSnapshot()
  })
})
