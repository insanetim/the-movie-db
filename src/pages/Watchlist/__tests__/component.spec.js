import { render } from '@testing-library/react'

import Watchlist from '../component'
import Wrapper from '../../../__mocks__/wrapperMock'

const mockedHookData = {
  movies: {
    results: [
      {
        id: 1,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: 'test/image'
      }
    ]
  },
  loading: false,
  error: null,
  handlePagination: jest.fn(),
  handleDelete: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Watchlist component', () => {
  afterAll(() => {
    jest.unmock('../hook')
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<Watchlist />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    const { asFragment } = render(<Watchlist />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = { message: 'test/error' }
    const { asFragment } = render(<Watchlist />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
