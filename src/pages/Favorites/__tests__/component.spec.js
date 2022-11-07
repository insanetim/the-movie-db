import { shallow } from 'enzyme'

import Favorites from '../component'

const mockedHookData = {
  favorites: {
    results: [
      {
        id: 1,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: 'test/image'
      }
    ]
  },
  handlePagination: jest.fn(),
  handleDelete: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

it('matches snapshot', () => {
  const component = shallow(<Favorites />)

  expect(component).toMatchSnapshot()
})

it('matches snapshot with loading', () => {
  mockedHookData.favorites = {}
  const component = shallow(<Favorites />)

  expect(component).toMatchSnapshot()
})
