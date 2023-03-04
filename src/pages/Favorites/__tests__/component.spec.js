import { shallow } from 'enzyme'

import Favorites from '../component'

const mockedHookData = {
  movies: {
    results: [
      {
        id: 1,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: 'test/image'
      }
    ]
  },
  loading: false,
  error: null,
  handlePagination: jest.fn(),
  handleDelete: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Favorites component tests', () => {
  let component = shallow(<Favorites />)

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    component = shallow(<Favorites />)

    expect(component).toMatchSnapshot()
  })

  it('matches snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = { message: 'test/error' }
    component = shallow(<Favorites />)

    expect(component).toMatchSnapshot()
  })
})
