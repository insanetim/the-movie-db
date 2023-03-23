import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import store from 'src/store'
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
      <Provider store={store}>
        <MemoryRouter>
          <MoviesList
            movies={mockedMovies}
            handlePagination={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
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
      <Provider store={store}>
        <MemoryRouter>
          <MoviesList
            movies={mockedMovies}
            handlePagination={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot without movies', () => {
    const mockedMovies = {
      results: []
    }
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MoviesList
            movies={mockedMovies}
            handlePagination={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
