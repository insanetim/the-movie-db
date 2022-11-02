import { shallow } from 'enzyme'

import MoviesList from '../component'

it('matches snapshot', () => {
  const mockedMovies = {
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

  const component = shallow(
    <MoviesList
      movies={mockedMovies}
      handlePagination={jest.fn()}
    />
  )

  expect(component).toMatchSnapshot()
})

it('matches snapshot with 1 page', () => {
  const mockedMovies = {
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

  const component = shallow(
    <MoviesList
      movies={mockedMovies}
      handlePagination={jest.fn()}
    />
  )

  expect(component).toMatchSnapshot()
})

it('matches snapshot with no movies', () => {
  const mockedMovies = {
    results: []
  }
  const component = shallow(
    <MoviesList
      movies={mockedMovies}
      handlePagination={jest.fn()}
    />
  )

  expect(component).toMatchSnapshot()
})
