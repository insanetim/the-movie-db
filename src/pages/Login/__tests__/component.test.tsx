import { render } from '@testing-library/react'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import type { LoginHook } from '../types'

import Login from '../component'

const mockedHookData: LoginHook = {
  handleLogIn: jest.fn(),
  loading: false
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Login component', () => {
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
