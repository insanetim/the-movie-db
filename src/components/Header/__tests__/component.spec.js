import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import store from 'src/store'
import Header from '../component'

const mockedHookData = {
  account: {
    avatar: {
      gravatar: {
        hash: 'test/avatar'
      }
    },
    username: 'test/username'
  },
  handleLogOut: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Header component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with empty account', () => {
    mockedHookData.account = {}
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
