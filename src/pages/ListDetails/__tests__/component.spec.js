import { shallow } from 'enzyme'

import ListDetails from '../component'

const mockedHookData = {
  list: {
    name: 'Test list',
    items: []
  },
  loading: false,
  handleListDelete: jest.fn(),
  handleMovieDelete: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

it('matches snapshot', () => {
  const component = shallow(<ListDetails />)

  expect(component).toMatchSnapshot()
})

it('matches snapshot with loading', () => {
  mockedHookData.loading = true
  const component = shallow(<ListDetails />)

  expect(component).toMatchSnapshot()
})
