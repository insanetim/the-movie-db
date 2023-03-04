import { shallow } from 'enzyme'

import Dashboard from '../component'

const mockedHookData = {
  searchQuery: null
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Dashboard component tests', () => {
  let component = shallow(<Dashboard />)

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('matches snapshot with searchQuery', () => {
    mockedHookData.searchQuery = 'test/searchQuery'
    component = shallow(<Dashboard />)

    expect(component).toMatchSnapshot()
  })
})
