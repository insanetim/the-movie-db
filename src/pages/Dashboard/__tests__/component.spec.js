import { shallow } from 'enzyme'

import Dashboard from '../component'

const mockedHookData = {
  searchQuery: null
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

it('matches snapshot', () => {
  const component = shallow(<Dashboard />)

  expect(component).toMatchSnapshot()
})

it('matches snapshot with searchQuery', () => {
  mockedHookData.searchQuery = 'test/search'
  const component = shallow(<Dashboard />)

  expect(component).toMatchSnapshot()
})
