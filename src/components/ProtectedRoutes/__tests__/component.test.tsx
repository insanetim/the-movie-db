import { render } from '@testing-library/react'
import { Location } from 'react-router-dom'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import ProtectedRoutes from '../component'
import { ProtectedRoutesHook } from '../types'

const mockedHook: ProtectedRoutesHook = {
  location: {} as Location,
  sessionId: 'test/sessionId',
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <></>,
}))

describe('ProtectedRoutes component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<ProtectedRoutes />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot without sessionId', () => {
    mockedHook.sessionId = ''
    const { asFragment } = render(<ProtectedRoutes />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
