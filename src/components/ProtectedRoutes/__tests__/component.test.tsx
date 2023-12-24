import { render } from '@testing-library/react'
import { Location } from 'react-router-dom'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import ProtectedRoutes from '../component'
import { ProtectedRoutesHook } from '../types'

const mockedHook: ProtectedRoutesHook = {
  isAuthenticated: true,
  location: {} as Location,
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('ProtectedRoutes component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<ProtectedRoutes />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot without isAuthenticated', () => {
    mockedHook.isAuthenticated = false
    const { asFragment } = render(<ProtectedRoutes />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
