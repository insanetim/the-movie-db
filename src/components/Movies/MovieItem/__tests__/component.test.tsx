import { fireEvent, render } from '@testing-library/react'
import { mergeDeepRight } from 'ramda'
import { mockMovie } from 'src/__mocks__/mockMovie'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import MovieItem from '../component'
import { MovieItemHook } from '../types'

const mockedHookData: MovieItemHook = {
  handleClick: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('MovieItem component', () => {
  const props = {
    handleMovieDelete: jest.fn(),
    movie: mockMovie
  }

  it('should match snapshot', () => {
    const { asFragment } = render(<MovieItem {...props} />, {
      wrapper: Wrapper
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot without poster_path', () => {
    const props = {
      movie: mergeDeepRight(mockMovie, { poster_path: null })
    }
    const { asFragment } = render(<MovieItem {...props} />, {
      wrapper: Wrapper
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('handles handleMovieDelete', () => {
    const { getByTestId } = render(<MovieItem {...props} />, {
      wrapper: Wrapper
    })

    fireEvent.click(getByTestId('deleteMovieAction'))

    expect(props.handleMovieDelete).toHaveBeenCalled()
  })
})
