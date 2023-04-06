import { render } from '@testing-library/react'

import Wrapper from 'src/__mocks__/wrapperMock'
import SearchResult from '../component'

const mockedHookData = {
  movies: {
    results: [
      {
        id: 123,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: 'test/image'
      },
      {
        id: 321,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: 'test/image'
      }
    ],
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
    const { asFragment } = render(<SearchResult />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with 1 page', () => {
    mockedHookData.movies = {
      results: [
        {
          id: 123,
          title: 'test/title',
          overview: 'test/overview',
          poster_path: 'test/image'
        }
      ],
      total_pages: 1,
      total_results: 20
    }
    const { asFragment } = render(<SearchResult />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot without movies', () => {
    mockedHookData.movies = { results: [] }
    const { asFragment } = render(<SearchResult />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    const { asFragment } = render(<SearchResult />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = { message: 'test/error' }
    const { asFragment } = render(<SearchResult />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
