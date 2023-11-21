import { render } from '@testing-library/react'
import { mockMovie } from 'src/__mocks__/mockMovie'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import MoviesList from '../component'

describe('MoviesList component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <MoviesList
        handleMovieDelete={jest.fn()}
        movies={[mockMovie]}
      />,
      { wrapper: Wrapper }
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
