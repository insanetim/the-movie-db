import { shallow } from 'enzyme'

import ListDetails from '../component'

const mockedHookData = {
  list: {
    name: 'Test list',
    items: []
  },
  loading: false,
  error: null,
  handleListDelete: jest.fn(),
  handleMovieDelete: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('ListDetails components tests', () => {
  let component = shallow(<ListDetails />)
  it('matches snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    component = shallow(<ListDetails />)

    expect(component).toMatchSnapshot()
  })

  it('matches snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = { message: 'test/error' }
    component = shallow(<ListDetails />)

    expect(component).toMatchSnapshot()
  })
})
