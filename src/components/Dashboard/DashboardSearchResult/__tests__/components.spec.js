import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import store from 'src/store'
import DashboardSearchResult from '../component'

const mockedHookData = {
  movies: {
    results: [
      {
        id: 123,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: 'test/image'
      },
      {
        id: 321,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: 'test/image'
      }
    ],
    total_pages: 10,
    total_results: 200
  },
  loading: false,
  error: null,
  handlePagination: () => jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('DashboardSearchResult component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <DashboardSearchResult />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot without movies', () => {
    mockedHookData.movies = { results: [] }
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <DashboardSearchResult />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <DashboardSearchResult />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = { message: 'test/error' }
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <DashboardSearchResult />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
