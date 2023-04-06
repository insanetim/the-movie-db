import { render } from '@testing-library/react'

import Wrapper from 'src/__mocks__/wrapperMock'
import Login from '../component'

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
