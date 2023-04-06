import { render } from '@testing-library/react'

import Wrapper from 'src/__mocks__/wrapperMock'
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
    const { asFragment } = render(<Header />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with empty account', () => {
    mockedHookData.account = {}
    const { asFragment } = render(<Header />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
