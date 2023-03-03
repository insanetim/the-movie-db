import { shallow } from 'enzyme'

import DashboardSearchInput from '../component'

const mockedHookData = {
  currentValue: 'test/searchQuery',
  handleChange: jest.fn(),
  handleSearch: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('CreateListModal component tests', () => {
  const component = shallow(<DashboardSearchInput />)

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot()
  })
})
