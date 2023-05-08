import { render } from '@testing-library/react'

import { mockMovie } from 'src/__mocks__/mockMovie'
import Wrapper from 'src/utils/testHelpers/wrapperMock'
import type { SearchResultHook } from '../types'
import SearchResult from '../component'

const mockedHookData: SearchResultHook = {
  movies: {
    page: 1,
    results: [mockMovie],
    total_pages: 10,
    total_results: 200
  },
  loading: false,
  error: null,
  handlePagination: () => jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('SearchResult component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<SearchResult query='test/search' />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with 1 page', () => {
    mockedHookData.movies = {
      page: 1,
      results: [mockMovie],
      total_pages: 1,
      total_results: 1
    }
    const { asFragment } = render(<SearchResult query='test/search' />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot without movies', () => {
    mockedHookData.movies = {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 1
    }
    const { asFragment } = render(<SearchResult query='test/search' />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    const { asFragment } = render(<SearchResult query='test/search' />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = 'Something went wrong!'
    const { asFragment } = render(<SearchResult query='test/search' />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
