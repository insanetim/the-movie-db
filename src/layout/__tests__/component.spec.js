/* eslint-disable react/jsx-no-useless-fragment */
import { shallow } from 'enzyme'

import Layout from '../component'

jest.mock('react-router-dom', () => ({
  Outlet: () => <></>
}))

it('matches snapshot', () => {
  const component = shallow(<Layout />)

  expect(component).toMatchSnapshot()
})
