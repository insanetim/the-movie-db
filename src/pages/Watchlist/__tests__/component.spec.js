import { shallow } from 'enzyme'

import Watchlist from '../component'

const mockedHookData = {
  watchlist: {
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
  const component = shallow(<Watchlist />)

  expect(component).toMatchSnapshot()
})

it('matches snapshot with loading', () => {
  mockedHookData.watchlist = {}
  const component = shallow(<Watchlist />)

  expect(component).toMatchSnapshot()
})
