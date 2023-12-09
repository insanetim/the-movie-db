import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockMovie } from 'src/__mocks__/mockMovie'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import MoviesList from '../component'

describe('MoviesList component', () => {
  const handleMovieDelete = jest.fn()
  const props = {
    handleMovieDelete,
    movies: [mockMovie],
  }

  it('should match snapshot', () => {
    const { asFragment } = render(<MoviesList {...props} />, {
      wrapper: Wrapper,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleMovieDelete" when delete button clicked', async () => {
    render(<MoviesList {...props} />, { wrapper: Wrapper })

    const user = userEvent.setup()
    const deleteBtn = screen.getByTestId('deleteMovieBtn')
    await user.click(deleteBtn)

    expect(props.handleMovieDelete).toHaveBeenCalled()
  })
})
