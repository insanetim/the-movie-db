import { shallow } from 'enzyme'

import MovieItem from '../component'

const mockedHookData = {
  handleClick: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

jest.mock('src/utils', () => ({
  bindId: jest.fn(node => node)
}))

describe('MovieItem component', () => {
  it('matches snapshot', () => {
    const props = {
      movie: {
        id: 1,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: 'test/image'
      },
      actions: [<div key='delete' />]
    }
    const component = shallow(<MovieItem {...props} />)
    expect(component).toMatchSnapshot()
  })

  it('matches snapshot with NoImage', () => {
    const props = {
      movie: {
        id: 1,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: null
      }
    }
    const component = shallow(<MovieItem {...props} />)
    expect(component).toMatchSnapshot()
  })
})
