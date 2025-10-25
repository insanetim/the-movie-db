import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockMovie } from 'src/__mocks__/mockMovie'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Favorite from '../component'
import { FavoriteHookReturn } from '../types'

const defaultMovies = {
  page: 1,
  results: [mockMovie],
  total_pages: 10,
  total_results: 200,
}

const mockedHook: FavoriteHookReturn = {
  error: null,
  handleConfirmDeleteMovie: jest.fn(),
  handleDeleteMovie: jest.fn(),
  handlePagination: jest.fn(),
  isLoading: false,
  movies: { ...defaultMovies },
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('Favorite component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    jest.clearAllMocks()
    mockedHook.error = null
    mockedHook.isLoading = false
    mockedHook.movies = { ...defaultMovies }
  })

  it('should render favorite movies list with pagination', () => {
    renderWithWrapper(<Favorite />)

    expect(
      screen.getByRole('heading', { name: 'Favorite' })
    ).toBeInTheDocument()
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should call "handlePagination" when pagination clicked', async () => {
    renderWithWrapper(<Favorite />)

    const link = screen.getByText('2')
    await user.click(link)

    expect(mockedHook.handlePagination).toHaveBeenCalled()
  })

  it('should call "handleMovieDelete" when delete button clicked', async () => {
    renderWithWrapper(<Favorite />)

    const deleteBtn = screen.getByTestId('deleteMovieBtn')
    await user.click(deleteBtn)

    expect(mockedHook.handleConfirmDeleteMovie).toHaveBeenCalled()
  })

  it('should render movie list without pagination when single page', () => {
    mockedHook.movies = {
      page: 1,
      results: [mockMovie],
      total_pages: 1,
      total_results: 1,
    }

    renderWithWrapper(<Favorite />)

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument()
    expect(screen.queryByText('2')).not.toBeInTheDocument()
  })

  it('should render empty state when movies are unavailable', () => {
    mockedHook.movies = undefined
    renderWithWrapper(<Favorite />)

    expect(screen.getByText('No results')).toBeInTheDocument()
  })

  it('should render empty state when movies list is empty', () => {
    mockedHook.movies = {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0,
    }

    renderWithWrapper(<Favorite />)

    expect(screen.getByText('No results')).toBeInTheDocument()
  })

  it('should render loading state when fetching movies', () => {
    mockedHook.isLoading = true
    renderWithWrapper(<Favorite />)

    expect(document.querySelector('.ant-spin')).toBeInTheDocument()
  })

  it('should render error state when request fails', () => {
    mockedHook.isLoading = false
    mockedHook.error = 'Something went wrong!'
    renderWithWrapper(<Favorite />)

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument()
  })
})
