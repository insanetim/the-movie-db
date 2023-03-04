import { shallow } from 'enzyme'

import Watchlist from '../component'

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

describe('Watchlist components tests', () => {
  let component = shallow(<Watchlist />)

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    component = shallow(<Watchlist />)

    expect(component).toMatchSnapshot()
  })

  it('matches snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = { message: 'test/error' }
    component = shallow(<Watchlist />)

    expect(component).toMatchSnapshot()
  })
})
