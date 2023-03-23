import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import store from 'src/store'
import Watchlist from '../component'

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
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Watchlist />
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
          <Watchlist />
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
          <Watchlist />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
