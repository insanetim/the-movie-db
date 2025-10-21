import { Location } from 'react-router-dom'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ProtectedRoutes from '../component'
import { ProtectedRoutesHookReturn } from '../types'

const mockedHook: ProtectedRoutesHookReturn = {
  location: {} as Location,
  sessionId: 'test/session_id',
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('ProtectedRoutes component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<ProtectedRoutes />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot without sessionId', () => {
    mockedHook.sessionId = null

    const { asFragment } = renderWithWrapper(<ProtectedRoutes />)

    expect(asFragment()).toMatchSnapshot()
  })
})
