import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockMovie } from 'src/__mocks__/mockMovie'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import SearchResult from '../component'
import { SearchResultHook } from '../types'

const mockedHook: SearchResultHook = {
  error: null,
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

describe('SearchResult component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<SearchResult query='test/search' />, {
      wrapper: Wrapper,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handlePagination" when pagination clicked', async () => {
    render(<SearchResult query='test/search' />, { wrapper: Wrapper })

    const user = userEvent.setup()
    const link = screen.getByText('2')
    await user.click(link)

    expect(mockedHook.handlePagination).toHaveBeenCalled()
  })

  it('should match snapshot with 1 page', () => {
    mockedHook.movies = {
      page: 1,
      results: [mockMovie],
      total_pages: 1,
      total_results: 1,
    }
    const { asFragment } = render(<SearchResult query='test/search' />, {
      wrapper: Wrapper,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot without movies', () => {
    mockedHook.movies = {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 1,
    }
    const { asFragment } = render(<SearchResult query='test/search' />, {
      wrapper: Wrapper,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    mockedHook.loading = true
    const { asFragment } = render(<SearchResult query='test/search' />, {
      wrapper: Wrapper,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with error', () => {
    mockedHook.loading = false
    mockedHook.error = 'Something went wrong!'
    const { asFragment } = render(<SearchResult query='test/search' />, {
      wrapper: Wrapper,
    })

    expect(asFragment()).toMatchSnapshot()
  })
})
