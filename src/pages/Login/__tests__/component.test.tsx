import renderWithWrapper from 'src/utils/testHelpers/renderWithWrapper'

import Login from '../component'
import { LoginHook } from '../types'

const mockedHook: LoginHook = {
  handleLogIn: jest.fn(),
  isSubmitting: false,
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('Login component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<Login />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with isSubmitting', () => {
    mockedHook.isSubmitting = true
    const { asFragment } = renderWithWrapper(<Login />)

    expect(asFragment()).toMatchSnapshot()
  })
})
