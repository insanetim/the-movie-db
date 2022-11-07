import { shallow } from 'enzyme'

import ListContent from '../component'

it('matches snapshot', () => {
  const mockedMovies = [
    {
      id: 1,
      title: 'test/title',
      overview: 'test/overview',
      poster_path: 'test/poster_path'
    }
  ]
  const component = shallow(<ListContent movies={mockedMovies} />)

  expect(component).toMatchSnapshot()
})

it('matches snapshot without movies', () => {
  const component = shallow(<ListContent />)

  expect(component).toMatchSnapshot()
})
