import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockMovie } from 'src/__mocks__/mockMovie'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ListDetails from '../component'
import { ListDetailsHookReturn } from '../types'

const defaultList = {
  description: 'test/description',
  id: 1234,
  items: [mockMovie],
  name: 'test/list',
  page: 1,
  total_pages: 10,
  total_results: 200,
}

const mockedHook: ListDetailsHookReturn = {
  error: null,
  handleConfirmDeleteList: jest.fn(),
  handleConfirmDeleteMovie: jest.fn(),
  handleDeleteList: jest.fn(),
  handleDeleteMovie: jest.fn(),
  handlePagination: jest.fn(),
  isLoading: false,
  list: { ...defaultList },
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('ListDetails component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    jest.clearAllMocks()
    mockedHook.error = null
    mockedHook.isLoading = false
    mockedHook.list = {
      ...defaultList,
      items: [...defaultList.items],
    }
  })

  it('should render list details with pagination', () => {
    renderWithWrapper(<ListDetails />)

    expect(
      screen.getByRole('heading', { name: defaultList.name })
    ).toBeInTheDocument()
    expect(screen.getByTestId('deleteListBtn')).toBeInTheDocument()
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should call "handleListDelete" when delete button clicked', async () => {
    renderWithWrapper(<ListDetails />)

    const deleteBtn = screen.getByTestId('deleteListBtn')
    await user.click(deleteBtn)

    expect(mockedHook.handleConfirmDeleteList).toHaveBeenCalled()
  })

  it('should call "handleMovieDelete" when delete button clicked', async () => {
    renderWithWrapper(<ListDetails />)

    const deleteBtn = screen.getByTestId('deleteMovieBtn')
    await user.click(deleteBtn)

    expect(mockedHook.handleConfirmDeleteMovie).toHaveBeenCalled()
  })

  it('should call "handlePagination" when pagination clicked', async () => {
    renderWithWrapper(<ListDetails />)

    const link = screen.getByText('2')
    await user.click(link)

    expect(mockedHook.handlePagination).toHaveBeenCalled()
  })

  it('should render list without pagination when single page', () => {
    mockedHook.list = {
      ...defaultList,
      items: [mockMovie],
      total_pages: 1,
      total_results: 1,
    }

    renderWithWrapper(<ListDetails />)

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument()
    expect(screen.queryByText('2')).not.toBeInTheDocument()
  })

  it('should render empty state when list is unavailable', () => {
    mockedHook.list = undefined
    renderWithWrapper(<ListDetails />)

    expect(screen.getByText('No results')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'My List' })).toBeInTheDocument()
  })

  it('should render empty state when list has no items', () => {
    mockedHook.list = {
      ...defaultList,
      items: [],
      total_results: 0,
    }

    renderWithWrapper(<ListDetails />)

    expect(screen.getByText('No results')).toBeInTheDocument()
  })

  it('should render loading state when fetching list details', () => {
    mockedHook.isLoading = true
    const { container } = renderWithWrapper(<ListDetails />)

    expect(container.querySelector('.ant-spin')).toBeInTheDocument()
  })

  it('should render error state when request fails', () => {
    mockedHook.isLoading = false
    mockedHook.error = 'Something went wrong!'
    renderWithWrapper(<ListDetails />)

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument()
  })
})
