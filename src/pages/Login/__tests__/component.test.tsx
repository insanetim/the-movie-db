import { render } from '@testing-library/react'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import Login from '../component'
import { LoginHook } from '../types'

const mockedHook: LoginHook = {
  handleLogIn: jest.fn(),
  loading: false
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('Login component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Login />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    mockedHook.loading = true
    const { asFragment } = render(<Login />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
