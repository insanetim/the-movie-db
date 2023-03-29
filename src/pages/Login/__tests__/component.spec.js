import { render } from '@testing-library/react'

import Login from '../component'
import Wrapper from '../../../__mocks__/wrapperMock'

const mockedHookData = {
  loading: false,
  handleLogIn: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Login component', () => {
  afterAll(() => {
    jest.unmock('../hook')
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<Login />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    const { asFragment } = render(<Login />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
