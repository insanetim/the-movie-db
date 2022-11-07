import { shallow } from 'enzyme'

import PopoverContent from '../component'

const mockedHookData = {
  lists: {
    results: [{ id: 1, name: 'Test list' }]
  },
  handleAddToNewList: jest.fn(),
  handleAddToList: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

it('matches snapshot', () => {
  const component = shallow(<PopoverContent />)

  expect(component).toMatchSnapshot()
})

it('handles button click', () => {
  const component = shallow(<PopoverContent />)
  component.find('Button').last().simulate('click')

  expect(mockedHookData.handleAddToList).toHaveBeenCalledWith(1)
})
