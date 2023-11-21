import { render } from '@testing-library/react'
import { mockMovie } from 'src/__mocks__/mockMovie'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import SearchResult from '../component'
import { SearchResultHook } from '../types'

const mockedHookData: SearchResultHook = {
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

describe('SearchResult component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<SearchResult query='test/search' />, {
      wrapper: Wrapper
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with 1 page', () => {
    mockedHookData.movies = {
      page: 1,
      results: [mockMovie],
      total_pages: 1,
      total_results: 1
    }
    const { asFragment } = render(<SearchResult query='test/search' />, {
      wrapper: Wrapper
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot without movies', () => {
    mockedHookData.movies = {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 1
    }
    const { asFragment } = render(<SearchResult query='test/search' />, {
      wrapper: Wrapper
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    const { asFragment } = render(<SearchResult query='test/search' />, {
      wrapper: Wrapper
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = 'Something went wrong!'
    const { asFragment } = render(<SearchResult query='test/search' />, {
      wrapper: Wrapper
    })

    expect(asFragment()).toMatchSnapshot()
  })
})
