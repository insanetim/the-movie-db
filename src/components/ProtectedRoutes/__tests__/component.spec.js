/* eslint-disable react/jsx-no-useless-fragment */
import { render } from '@testing-library/react'

import ProtectedRoutes from '../component'
import Wrapper from '../../../__mocks__/wrapperMock'

const mockedHookData = {
  sessionId: 'test/sessionId',
  location: {}
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
    mockedHookData.sessionId = null
    const { asFragment } = render(<ProtectedRoutes />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
