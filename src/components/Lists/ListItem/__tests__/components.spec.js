import { shallow } from 'enzyme'

import ListItem from '../component'

const mockedHookData = {
  handleClick: jest.fn(),
  handleDelete: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

it('matches snapshot', () => {
  const mockedList = {
    id: 1,
    name: 'test/name',
    description: 'test/description'
  }
  const component = shallow(<ListItem list={mockedList} />)

  expect(component).toMatchSnapshot()
})
