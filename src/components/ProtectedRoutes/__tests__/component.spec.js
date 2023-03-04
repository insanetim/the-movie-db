/* eslint-disable react/jsx-no-useless-fragment */
import { shallow } from 'enzyme'

import ProtectedRoutes from '../component'

jest.mock('react-router-dom', () => ({
  Outlet: () => <></>,
  Navigate: () => <></>,
  useLocation: jest.fn(() => ({}))
}))

const mockedHookData = {
  sessionId: 'test/sessionId'
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

it('matches snapshot', () => {
  const component = shallow(<ProtectedRoutes />)

  expect(component).toMatchSnapshot()
})

it('matches snapshot without sessionId', () => {
  mockedHookData.sessionId = null
  const component = shallow(<ProtectedRoutes />)

  expect(component).toMatchSnapshot()
})
