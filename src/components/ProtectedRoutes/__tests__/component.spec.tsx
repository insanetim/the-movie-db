import type { Location } from 'react-router-dom'
import { render } from '@testing-library/react'

import Wrapper from 'src/utils/testHelpers/wrapperMock'
import ProtectedRoutes from '../component'
import type { ProtectedRoutesHook } from '../types'

const mockedHookData: ProtectedRoutesHook = {
  sessionId: 'test/sessionId',
  location: {} as Location
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <></>
}))

describe('ProtectedRoutes component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<ProtectedRoutes />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot without sessionId', () => {
    mockedHookData.sessionId = ''
    const { asFragment } = render(<ProtectedRoutes />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
