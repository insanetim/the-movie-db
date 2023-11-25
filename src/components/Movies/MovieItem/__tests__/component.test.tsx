import { fireEvent, render, screen } from '@testing-library/react'
import { mergeDeepRight } from 'ramda'
import { mockMovie } from 'src/__mocks__/mockMovie'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import MovieItem from '../component'
import { MovieItemHook } from '../types'

const mockedHook: MovieItemHook = {
  handleClick: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

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

  it('should call "handleClick" when card clicked', () => {
    render(<MovieItem {...props} />, { wrapper: Wrapper })
    const card = screen.getByTestId('movieItemCard')
    fireEvent.click(card)

    expect(mockedHook.handleClick).toHaveBeenCalled()
  })

  it('should call "handleMovieDelete" when delete button clicked', () => {
    render(<MovieItem {...props} />, { wrapper: Wrapper })
    const deleteBtn = screen.getByTestId('deleteMovieBtn')
    fireEvent.click(deleteBtn)

    expect(props.handleMovieDelete).toHaveBeenCalled()
  })
})
