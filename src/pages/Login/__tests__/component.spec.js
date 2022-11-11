import { shallow } from 'enzyme'

import Login from '../component'

const mockedHookData = {
  loading: false,
  handleLogIn: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

it('matches snapshot', () => {
  const component = shallow(<Login />)

  expect(component).toMatchSnapshot()
})

it('matches snapshot with loading', () => {
  mockedHookData.loading = true
  const component = shallow(<Login />)

  expect(component).toMatchSnapshot()
})
