import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockMovie } from 'src/__mocks__/mockMovie'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import SearchResult from '../component'
import { SearchResultHookReturn } from '../types'

const mockedHook: SearchResultHookReturn = {
  error: null,
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

describe('SearchResult component', () => {
  const user = userEvent.setup()
  const defaultMovies = {
    page: 1,
    results: [mockMovie],
    total_pages: 10,
    total_results: 200,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockedHook.error = null
    mockedHook.isLoading = false
    mockedHook.movies = { ...defaultMovies }
  })

  it('should call "handlePagination" when pagination clicked', async () => {
    renderWithWrapper(<SearchResult query='test/search' />)

    const link = screen.getByText('2')
    await user.click(link)

    expect(mockedHook.handlePagination).toHaveBeenCalled()
  })

  it('should render movie list with pagination', () => {
    renderWithWrapper(<SearchResult query='test/search' />)

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should render movie list without pagination when single page', () => {
    mockedHook.movies = {
      page: 1,
      results: [mockMovie],
      total_pages: 1,
      total_results: 1,
    }

    renderWithWrapper(<SearchResult query='test/search' />)

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument()
    expect(screen.queryByText('2')).not.toBeInTheDocument()
  })

  it('should render empty state without movies', () => {
    mockedHook.movies = {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 1,
    }

    renderWithWrapper(<SearchResult query='test/search' />)

    expect(screen.getByText('No movies found')).toBeInTheDocument()
  })

  it('should render loading state', () => {
    mockedHook.isLoading = true

    renderWithWrapper(<SearchResult query='test/search' />)

    expect(document.querySelector('.ant-spin')).toBeInTheDocument()
  })

  it('should render error state', () => {
    mockedHook.isLoading = false
    mockedHook.error = 'Something went wrong!'

    renderWithWrapper(<SearchResult query='test/search' />)

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument()
  })
})
