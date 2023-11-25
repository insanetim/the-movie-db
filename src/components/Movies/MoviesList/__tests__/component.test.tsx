import { fireEvent, render, screen } from '@testing-library/react'
import { mockMovie } from 'src/__mocks__/mockMovie'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import MoviesList from '../component'

describe('MoviesList component', () => {
  const handleMovieDelete = jest.fn()
  const props = {
    handleMovieDelete,
    movies: [mockMovie]
  }

  it('should match snapshot', () => {
    const { asFragment } = render(<MoviesList {...props} />, {
      wrapper: Wrapper
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleMovieDelete" when delete button clicked', () => {
    render(<MoviesList {...props} />, { wrapper: Wrapper })
    const deleteBtn = screen.getByTestId('deleteMovieBtn')
    fireEvent.click(deleteBtn)

    expect(props.handleMovieDelete).toHaveBeenCalled()
  })
})
