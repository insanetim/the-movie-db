import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import store from 'src/store'
import DashboardTrending from '../component'

const mockedHookData = {
  movies: {
    results: [
      {
        id: 1,
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

describe('DashboardTrending component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <DashboardTrending />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot without movies', () => {
    mockedHookData.movies = {}
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <DashboardTrending />
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
          <DashboardTrending />
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
          <DashboardTrending />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
