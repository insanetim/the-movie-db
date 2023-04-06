import { render } from '@testing-library/react'

import Wrapper from 'src/__mocks__/wrapperMock'
import MoviesList from '../component'

describe('MoviesList component', () => {
  it('matches snapshot', () => {
    const mockedMovies = {
      results: [
        {
          id: 123,
          title: 'test/title',
          overview: 'test/overview',
          poster_path: 'test/image'
        },
        {
          id: 321,
          title: 'test/title',
          overview: 'test/overview',
          poster_path: 'test/image'
        }
      ],
      total_pages: 10,
      total_results: 200
    }
    const { asFragment } = render(
      <MoviesList
        movies={mockedMovies}
        handlePagination={jest.fn()}
      />,
      { wrapper: Wrapper }
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with 1 page', () => {
    const mockedMovies = {
      results: [
        {
          id: 123,
          title: 'test/title',
          overview: 'test/overview',
          poster_path: 'test/image'
        }
      ],
      total_pages: 1,
      total_results: 20
    }
    const { asFragment } = render(
      <MoviesList
        movies={mockedMovies}
        handlePagination={jest.fn()}
      />,
      { wrapper: Wrapper }
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot without movies', () => {
    const mockedMovies = {
      results: []
    }
    const { asFragment } = render(
      <MoviesList
        movies={mockedMovies}
        handlePagination={jest.fn()}
      />,
      { wrapper: Wrapper }
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
