import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockMovie } from 'src/__mocks__/mockMovie'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import ListDetails from '../component'
import { ListDetailHook } from '../types'

const mockedHook: ListDetailHook = {
  error: null,
  handleListDelete: jest.fn(),
  handleMovieDelete: jest.fn(),
  handlePagination: jest.fn(),
  list: {
    created_by: 'test/author',
    description: 'test/description',
    favorite_count: 0,
    id: 1234,
    iso_639_1: 'en',
    item_count: 1,
    items: [mockMovie],
    list_type: '',
    name: 'test/list',
    page: 1,
    poster_path: null,
    total_pages: 10,
    total_results: 200
  },
  loading: false
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('ListDetail component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<ListDetails />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleListDelete" when delete button clicked', async () => {
    render(<ListDetails />, { wrapper: Wrapper })

    const user = userEvent.setup()
    const deleteBtn = screen.getByTestId('deleteListBtn')
    await user.click(deleteBtn)

    expect(mockedHook.handleListDelete).toHaveBeenCalled()
  })

  it('should call "handleMovieDelete" when delete button clicked', async () => {
    render(<ListDetails />, { wrapper: Wrapper })

    const user = userEvent.setup()
    const deleteBtn = screen.getByTestId('deleteMovieBtn')
    await user.click(deleteBtn)

    expect(mockedHook.handleMovieDelete).toHaveBeenCalled()
  })

  it('should call "handlePagination" when pagination clicked', async () => {
    render(<ListDetails />, { wrapper: Wrapper })

    const user = userEvent.setup()
    const link = screen.getByText('2')
    await user.click(link)

    expect(mockedHook.handlePagination).toHaveBeenCalled()
  })

  it('should match snapshot with 1 page', () => {
    mockedHook.list = {
      created_by: 'test/author',
      description: 'test/description',
      favorite_count: 0,
      id: 1234,
      iso_639_1: 'en',
      item_count: 1,
      items: [mockMovie],
      list_type: '',
      name: 'test/list',
      page: 1,
      poster_path: null,
      total_pages: 1,
      total_results: 1
    }
    const { asFragment } = render(<ListDetails />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with empty list', () => {
    mockedHook.list = null
    const { asFragment } = render(<ListDetails />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    mockedHook.loading = true
    const { asFragment } = render(<ListDetails />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with error', () => {
    mockedHook.loading = false
    mockedHook.error = 'Something went wrong!'
    const { asFragment } = render(<ListDetails />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
