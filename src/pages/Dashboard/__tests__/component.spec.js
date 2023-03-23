import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import store from 'src/store'
import Dashboard from '../component'

const mockedHookData = {
  searchQuery: null
}
jest.mock('../hook', () => jest.fn().mockImplementation(() => mockedHookData))

describe('Dashboard component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with searchQuery', () => {
    mockedHookData.searchQuery = 'test/searchQuery'
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
