import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockList } from 'src/__mocks__/mockList'
import renderWithWrapper from 'src/utils/testHelpers/renderWithWrapper'

import Lists from '../component'
import { ListsHookReturn } from '../types'

const mockedHook: ListsHookReturn = {
  error: null,
  handleCreateList: jest.fn(),
  handlePagination: jest.fn(),
  lists: {
    page: 1,
    results: [mockList],
    total_pages: 10,
    total_results: 200,
  },
  loading: false,
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

jest.mock('src/store/createdLists/selectors', () => ({
  createdListsSelector: () => null,
}))

describe('Lists component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<Lists />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleCreateList" when button clicked', async () => {
    renderWithWrapper(<Lists />)

    const user = userEvent.setup()
    const createListBtn = screen.getByTestId('createListBtn')
    await user.click(createListBtn)

    expect(mockedHook.handleCreateList).toHaveBeenCalled()
  })

  it('should call "handlePagination" when pagination clicked', async () => {
    renderWithWrapper(<Lists />)

    const user = userEvent.setup()
    const link = screen.getByText('2')
    await user.click(link)

    expect(mockedHook.handlePagination).toHaveBeenCalled()
  })

  it('should match snapshot with 1 page', () => {
    mockedHook.lists = {
      page: 1,
      results: [mockList],
      total_pages: 1,
      total_results: 1,
    }

    const { asFragment } = renderWithWrapper(<Lists />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with empty lists', () => {
    mockedHook.lists = null
    const { asFragment } = renderWithWrapper(<Lists />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    mockedHook.loading = true
    const { asFragment } = renderWithWrapper(<Lists />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with error', () => {
    mockedHook.loading = false
    mockedHook.error = 'Something went wrong!'
    const { asFragment } = renderWithWrapper(<Lists />)

    expect(asFragment()).toMatchSnapshot()
  })
})
