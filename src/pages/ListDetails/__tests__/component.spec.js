import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import store from 'src/store'
import ListDetails from '../component'

const mockedHookData = {
  list: {
    name: 'Test list',
    items: []
  },
  loading: false,
  error: null,
  handleListDelete: jest.fn(),
  handleMovieDelete: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('ListDetails component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListDetails />
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
          <ListDetails />
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
          <ListDetails />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
