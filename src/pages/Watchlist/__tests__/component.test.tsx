import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockMovie } from 'src/__mocks__/mockMovie'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Watchlist from '../component'
import { WatchlistHookReturn } from '../types'

const mockedHook: WatchlistHookReturn = {
  error: null,
  handleConfirmDeleteMovie: jest.fn(),
  handleDeleteMovie: jest.fn(),
  handlePagination: jest.fn(),
  isLoading: false,
  movies: {
    page: 1,
    results: [mockMovie],
    total_pages: 10,
    total_results: 200,
  },
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('Watchlist component', () => {
  const user = userEvent.setup()

  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<Watchlist />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handlePagination" when pagination clicked', async () => {
    renderWithWrapper(<Watchlist />)

    const link = screen.getByText('2')
    await user.click(link)

    expect(mockedHook.handlePagination).toHaveBeenCalled()
  })

  it('should call "handleMovieDelete" when delete button clicked', async () => {
    renderWithWrapper(<Watchlist />)

    const deleteBtn = screen.getByTestId('deleteMovieBtn')
    await user.click(deleteBtn)

    expect(mockedHook.handleConfirmDeleteMovie).toHaveBeenCalled()
  })

  it('should match snapshot with 1 page', () => {
    mockedHook.movies = {
      page: 1,
      results: [mockMovie],
      total_pages: 1,
      total_results: 1,
    }

    const { asFragment } = renderWithWrapper(<Watchlist />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with empty movies', () => {
    mockedHook.movies = undefined

    const { asFragment } = renderWithWrapper(<Watchlist />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    mockedHook.isLoading = true

    const { asFragment } = renderWithWrapper(<Watchlist />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with error', () => {
    mockedHook.isLoading = false
    mockedHook.error = 'Something went wrong!'

    const { asFragment } = renderWithWrapper(<Watchlist />)

    expect(asFragment()).toMatchSnapshot()
  })
})
