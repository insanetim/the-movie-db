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
  loading: false,
  error: null,
  handleClick: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Lists component tests', () => {
  let component = shallow(<Lists />)
  it('matches snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    component = shallow(<Lists />)

    expect(component).toMatchSnapshot()
  })

  it('matches snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = { message: 'test/error' }
    component = shallow(<Lists />)

    expect(component).toMatchSnapshot()
  })
})
