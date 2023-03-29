import { render } from '@testing-library/react'

import ListContent from '../component'
import Wrapper from '../../../__mocks__/wrapperMock'

describe('ListContent cpmponent', () => {
  it('matches snapshot', () => {
    const mockedMovies = [
      {
        id: 1,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: 'test/poster_path'
      }
    ]
    const { asFragment } = render(<ListContent movies={mockedMovies} />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot without movies', () => {
    const { asFragment } = render(<ListContent />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
