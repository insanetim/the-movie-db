import { render } from '@testing-library/react'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import Login from '../component'
import { LoginHook } from '../types'

const mockedHookData: LoginHook = {
  handleLogIn: jest.fn(),
  loading: false
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Login component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Login />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    mockedHookData.loading = true
    const { asFragment } = render(<Login />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
