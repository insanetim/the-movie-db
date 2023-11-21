import { render } from '@testing-library/react'
import { mockList } from 'src/__mocks__/mockList'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import type { ListsHook } from '../types'

import Lists from '../component'

const mockedHookData: ListsHook = {
  error: null,
  handleCreateList: jest.fn(),
  handlePagination: jest.fn(),
  lists: {
    page: 1,
    results: [mockList],
    total_pages: 10,
    total_results: 200
  },
  loading: false
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

jest.mock('src/store/lists/selectors', () => ({
  listsSelector: jest.fn(() => null)
}))

describe('Lists component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Lists />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with 1 page', () => {
    mockedHookData.lists = {
      page: 1,
      results: [mockList],
      total_pages: 1,
      total_results: 1
    }

    const { asFragment } = render(<Lists />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with empty lists', () => {
    mockedHookData.lists = null
    const { asFragment } = render(<Lists />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    const { asFragment } = render(<Lists />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = 'Something went wrong!'
    const { asFragment } = render(<Lists />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})