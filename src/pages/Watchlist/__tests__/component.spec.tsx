import { render } from '@testing-library/react'

import type { WatchlistHook } from '../types'
import { mockMovie } from 'src/__mocks__/mockMovie'
import Wrapper from 'src/utils/testHelpers/wrapperMock'
import Watchlist from '../component'

const mockedHookData: WatchlistHook = {
  movies: {
    page: 1,
    results: [mockMovie],
    total_pages: 10,
    total_results: 200
  },
  loading: false,
  error: null,
  handlePagination: jest.fn(),
  handleMovieDelete: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Watchlist component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Watchlist />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with 1 page', () => {
    mockedHookData.movies = {
      page: 1,
      results: [mockMovie],
      total_pages: 1,
      total_results: 1
    }
    const { asFragment } = render(<Watchlist />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with empty movies', () => {
    mockedHookData.movies = null
    const { asFragment } = render(<Watchlist />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    const { asFragment } = render(<Watchlist />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = 'Something went wrong!'
    const { asFragment } = render(<Watchlist />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
