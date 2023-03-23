import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import store from 'src/store'
import Lists from '../component'

const mockedHookData = {
  lists: {
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
  handleClick: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Lists component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Lists />
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
          <Lists />
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
          <Lists />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
