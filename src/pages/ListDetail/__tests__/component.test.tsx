import { render } from '@testing-library/react'
import { mockMovie } from 'src/__mocks__/mockMovie'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import ListDetails from '../component'
import { ListDetailHook } from '../types'

const mockedHookData: ListDetailHook = {
  error: null,
  handleListDelete: jest.fn(),
  handleMovieDelete: jest.fn(),
  handlePagination: jest.fn(),
  list: {
    created_by: 'test/author',
    description: 'test/description',
    favorite_count: 0,
    id: 123,
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
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('ListDetail component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<ListDetails />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with 1 page', () => {
    mockedHookData.list = {
      created_by: 'test/author',
      description: 'test/description',
      favorite_count: 0,
      id: 123,
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

  it('matches snapshot with empty list', () => {
    mockedHookData.list = null
    const { asFragment } = render(<ListDetails />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    const { asFragment } = render(<ListDetails />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = 'Something went wrong!'
    const { asFragment } = render(<ListDetails />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
