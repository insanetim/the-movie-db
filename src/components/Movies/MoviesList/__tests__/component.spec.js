import { render } from '@testing-library/react'

import Wrapper from 'src/__mocks__/wrapperMock'
import MoviesList from '../component'

describe('MoviesList component', () => {
  it('matches snapshot', () => {
    const mockedMovies = [
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
    ]
    const { asFragment } = render(<MoviesList movies={mockedMovies} />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot without movies', () => {
    const mockedMovies = []
    const { asFragment } = render(<MoviesList movies={mockedMovies} />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
