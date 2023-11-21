import { render } from '@testing-library/react'
import { mockMovie } from 'src/__mocks__/mockMovie'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import Trending from '../component'
import { TrendingHook } from '../types'

const mockedHookData: TrendingHook = {
  error: null,
  handlePagination: () => jest.fn(),
  loading: false,
  movies: {
    page: 1,
    results: [mockMovie],
    total_pages: 10,
    total_results: 200
  }
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Trending component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Trending />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with 1 page', () => {
    mockedHookData.movies = {
      page: 1,
      results: [mockMovie],
      total_pages: 1,
      total_results: 1
    }
    const { asFragment } = render(<Trending />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot without movies', () => {
    mockedHookData.movies = {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 1
    }
    const { asFragment } = render(<Trending />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    const { asFragment } = render(<Trending />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = 'Something went wrong!'
    const { asFragment } = render(<Trending />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
