import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockMovie } from 'src/__mocks__/mockMovie'
import renderWithWrapper from 'src/utils/testHelpers/renderWithWrapper'

import MoviesList from '../component'
import { MoviesListProps } from '../types'

describe('MoviesList component', () => {
  const handleMovieDelete = jest.fn()
  const props: MoviesListProps = {
    handleMovieDelete,
    movies: [mockMovie],
  }

  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<MoviesList {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleMovieDelete" when delete button clicked', async () => {
    renderWithWrapper(<MoviesList {...props} />)

    const user = userEvent.setup()
    const deleteBtn = screen.getByTestId('deleteMovieBtn')
    await user.click(deleteBtn)

    expect(props.handleMovieDelete).toHaveBeenCalled()
  })
})
