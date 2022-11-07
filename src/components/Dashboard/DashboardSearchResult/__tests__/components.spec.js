import { shallow } from 'enzyme'

import DashboardSearchResult from '../component'

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
  handlePagination: () => jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('CreateListModal component tests', () => {
  let component = shallow(<DashboardSearchResult />)

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('matches snapshot without movies', () => {
    mockedHookData.movies = {}
    component = shallow(<DashboardSearchResult />)

    expect(component).toMatchSnapshot()
  })
})
