import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockMovie } from 'src/__mocks__/mockMovie'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import Watchlist from '../component'
import { WatchlistHook } from '../types'

const mockedHook: WatchlistHook = {
  error: null,
  handleMovieDelete: jest.fn(),
  handlePagination: jest.fn(),
  loading: false,
  movies: {
    page: 1,
    results: [mockMovie],
    total_pages: 10,
    total_results: 200,
  },
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('Watchlist component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Watchlist />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handlePagination" when pagination clicked', async () => {
    render(<Watchlist />, { wrapper: Wrapper })

    const user = userEvent.setup()
    const link = screen.getByText('2')
    await user.click(link)

    expect(mockedHook.handlePagination).toHaveBeenCalled()
  })

  it('should call "handleMovieDelete" when delete button clicked', async () => {
    render(<Watchlist />, { wrapper: Wrapper })

    const user = userEvent.setup()
    const deleteBtn = screen.getByTestId('deleteMovieBtn')
    await user.click(deleteBtn)

    expect(mockedHook.handleMovieDelete).toHaveBeenCalled()
  })

  it('should match snapshot with 1 page', () => {
    mockedHook.movies = {
      page: 1,
      results: [mockMovie],
      total_pages: 1,
      total_results: 1,
    }
    const { asFragment } = render(<Watchlist />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with empty movies', () => {
    mockedHook.movies = null
    const { asFragment } = render(<Watchlist />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    mockedHook.loading = true
    const { asFragment } = render(<Watchlist />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with error', () => {
    mockedHook.loading = false
    mockedHook.error = 'Something went wrong!'
    const { asFragment } = render(<Watchlist />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
