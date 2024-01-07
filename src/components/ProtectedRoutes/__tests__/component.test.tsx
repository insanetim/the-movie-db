import { Location } from 'react-router-dom'
import renderWithWrapper from 'src/utils/testHelpers/renderWithWrapper'

import ProtectedRoutes from '../component'
import { ProtectedRoutesHook } from '../types'

const mockedHook: ProtectedRoutesHook = {
  isAuthenticated: true,
  location: {} as Location,
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('ProtectedRoutes component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<ProtectedRoutes />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot without isAuthenticated', () => {
    mockedHook.isAuthenticated = false
    const { asFragment } = renderWithWrapper(<ProtectedRoutes />)

    expect(asFragment()).toMatchSnapshot()
  })
})
