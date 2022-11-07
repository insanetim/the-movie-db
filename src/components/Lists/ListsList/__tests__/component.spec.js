import { shallow } from 'enzyme'

import ListList from '../component'

const mockedHookData = {
  handlePaginationChange: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

it('matches snapshot', () => {
  const mockedLists = {
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
  }
  const component = shallow(<ListList lists={mockedLists} />)

  expect(component).toMatchSnapshot()
})

it('matches snapshot with 1 page', () => {
  const mockedLists = {
    results: [
      {
        id: 1,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: 'test/image'
      }
    ],
    total_pages: 1,
    total_results: 20
  }
  const component = shallow(<ListList lists={mockedLists} />)

  expect(component).toMatchSnapshot()
})

it('matches snapshot without lists', () => {
  const mockedLists = {
    results: []
  }
  const component = shallow(<ListList lists={mockedLists} />)

  expect(component).toMatchSnapshot()
})
