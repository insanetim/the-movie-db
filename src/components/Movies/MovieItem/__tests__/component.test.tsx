import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('should call "handleClick" when card clicked', async () => {
    render(<MovieItem {...props} />, { wrapper: Wrapper })

    const user = userEvent.setup()
    const card = screen.getByTestId('movieItemCard')
    await user.click(card)

    expect(mockedHook.handleClick).toHaveBeenCalled()
  })

  it('should call "handleMovieDelete" when delete button clicked', async () => {
    render(<MovieItem {...props} />, { wrapper: Wrapper })

    const user = userEvent.setup()
    const deleteBtn = screen.getByTestId('deleteMovieBtn')
    await user.click(deleteBtn)

    expect(props.handleMovieDelete).toHaveBeenCalled()
  })
})
