import { fireEvent, render } from '@testing-library/react'

import Wrapper from 'src/utils/testHelpers/wrapperMock'
import type { MovieItemHook } from '../types'
import MovieItem from '../component'
import { mockMovie } from 'src/__mocks__/mockMovie'
import { mergeDeepRight } from 'ramda'

const mockedHookData: MovieItemHook = {
  handleClick: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('MovieItem component', () => {
  const props = {
    movie: mockMovie,
    handleMovieDelete: jest.fn()
  }

  it('matches snapshot', () => {
    const { asFragment } = render(<MovieItem {...props} />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot without poster_path', () => {
    const props = {
      movie: mergeDeepRight(mockMovie, { poster_path: null })
    }
    const { asFragment } = render(<MovieItem {...props} />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('handles handleMovieDelete', () => {
    const { getByTestId } = render(<MovieItem {...props} />, { wrapper: Wrapper })

    fireEvent.click(getByTestId('deleteMovieAction'))

    expect(props.handleMovieDelete).toHaveBeenCalled()
  })
})
