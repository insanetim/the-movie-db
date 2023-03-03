import { shallow } from 'enzyme'

import DashboardTrending from '../component'

const mockedHookData = {
  movies: {
    results: [
      {
        id: 1,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: 'test/image'
      }
    ],
    total_pages: 10,
    total_results: 200
  },
  loading: false,
  error: null,
  handlePagination: () => jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('CreateListModal component tests', () => {
  let component = shallow(<DashboardTrending />)

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('matches snapshot without movies', () => {
    mockedHookData.movies = {}
    component = shallow(<DashboardTrending />)

    expect(component).toMatchSnapshot()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    component = shallow(<DashboardTrending />)

    expect(component).toMatchSnapshot()
  })

  it('matches snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = { message: 'test/error' }
    component = shallow(<DashboardTrending />)

    expect(component).toMatchSnapshot()
  })
})
