import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockList } from 'src/__mocks__/mockList'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Lists from '../component'
import { ListsHookReturn } from '../types'

const defaultLists = {
  page: 1,
  results: [mockList],
  total_pages: 10,
  total_results: 200,
}

const mockedHook: ListsHookReturn = {
  error: null,
  handleCreateList: jest.fn(),
  handleOpenCreateListModal: jest.fn(),
  handlePagination: jest.fn(),
  isLoading: false,
  lists: { ...defaultLists },
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('Lists component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    jest.clearAllMocks()
    mockedHook.error = null
    mockedHook.isLoading = false
    mockedHook.lists = { ...defaultLists, results: [...defaultLists.results] }
  })

  it('should render lists with pagination', () => {
    renderWithWrapper(<Lists />)

    expect(
      screen.getByRole('heading', { name: 'My Lists' })
    ).toBeInTheDocument()
    expect(screen.getByTestId('createListBtn')).toBeInTheDocument()
    expect(screen.getByText(mockList.name)).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should call "handleCreateList" when button clicked', async () => {
    renderWithWrapper(<Lists />)

    const createListBtn = screen.getByTestId('createListBtn')
    await user.click(createListBtn)

    expect(mockedHook.handleOpenCreateListModal).toHaveBeenCalled()
  })

  it('should call "handlePagination" when pagination clicked', async () => {
    renderWithWrapper(<Lists />)

    const link = screen.getByText('2')
    await user.click(link)

    expect(mockedHook.handlePagination).toHaveBeenCalled()
  })

  it('should render lists without pagination when single page', () => {
    mockedHook.lists = {
      page: 1,
      results: [mockList],
      total_pages: 1,
      total_results: 1,
    }

    renderWithWrapper(<Lists />)

    expect(screen.getByText(mockList.name)).toBeInTheDocument()
    expect(screen.queryByText('2')).not.toBeInTheDocument()
  })

  it('should render empty state when lists are unavailable', () => {
    mockedHook.lists = undefined

    renderWithWrapper(<Lists />)

    expect(screen.getByText('No results')).toBeInTheDocument()
  })

  it('should render empty state when list results are empty', () => {
    mockedHook.lists = {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0,
    }

    renderWithWrapper(<Lists />)

    expect(screen.getByText('No results')).toBeInTheDocument()
  })

  it('should render loading state when fetching lists', () => {
    mockedHook.isLoading = true
    renderWithWrapper(<Lists />)

    expect(document.querySelector('.ant-spin')).toBeInTheDocument()
  })

  it('should render error state when request fails', () => {
    mockedHook.isLoading = false
    mockedHook.error = 'Something went wrong!'
    renderWithWrapper(<Lists />)

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument()
  })
})
