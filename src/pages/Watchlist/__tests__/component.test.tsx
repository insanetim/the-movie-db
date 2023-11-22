import { render } from '@testing-library/react'
import { mockMovie } from 'src/__mocks__/mockMovie'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import Watchlist from '../component'
import { WatchlistHook } from '../types'

const mockedHookData: WatchlistHook = {
  error: null,
  handleMovieDelete: jest.fn(),
  handlePagination: jest.fn(),
  loading: false,
  movies: {
    page: 1,
    results: [mockMovie],
    total_pages: 10,
    total_results: 200
  }
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Watchlist component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Watchlist />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with 1 page', () => {
    mockedHookData.movies = {
      page: 1,
      results: [mockMovie],
      total_pages: 1,
      total_results: 1
    }
    const { asFragment } = render(<Watchlist />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with empty movies', () => {
    mockedHookData.movies = null
    const { asFragment } = render(<Watchlist />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    mockedHookData.loading = true
    const { asFragment } = render(<Watchlist />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = 'Something went wrong!'
    const { asFragment } = render(<Watchlist />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
