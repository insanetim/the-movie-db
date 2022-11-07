import { shallow } from 'enzyme'

import Lists from '../component'

const mockedHookData = {
  lists: {
    results: [
      {
        id: 1,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: 'test/image'
      }
    ]
  },
  handleClick: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

it('matches snapshot', () => {
  const component = shallow(<Lists />)

  expect(component).toMatchSnapshot()
})

it('matches snapshot with loading', () => {
  mockedHookData.lists = {}
  const component = shallow(<Lists />)

  expect(component).toMatchSnapshot()
})
