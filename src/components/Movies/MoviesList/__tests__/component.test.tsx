import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockMovie } from 'src/__mocks__/mockMovie'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import MovieItem from '../../MovieItem'
import MoviesList from '../component'
import { MoviesListProps } from '../types'

jest.mock('../../MovieItem', () =>
  jest.fn(() => <div data-testid='movie-item' />)
)

const mockedMovieItem = MovieItem as jest.Mock

describe('MoviesList component', () => {
  const user = userEvent.setup()
  const handleMovieDelete = jest.fn()
  const props: MoviesListProps = {
    handleMovieDelete,
    movies: [mockMovie],
  }

  beforeEach(() => {
    mockedMovieItem.mockClear()
    handleMovieDelete.mockClear()
  })

  it('renders each movie using MovieItem with expected props', () => {
    renderWithWrapper(<MoviesList {...props} />)

    expect(screen.getAllByTestId('movie-item')).toHaveLength(
      props.movies.length
    )
    expect(mockedMovieItem).toHaveBeenCalledWith(
      expect.objectContaining({
        handleMovieDelete,
        id: mockMovie.id,
        overview: mockMovie.overview,
        posterPath: mockMovie.poster_path,
        title: mockMovie.title,
      }),
      expect.anything()
    )
  })

  it('renders nothing when movies list is empty', () => {
    const { queryByTestId } = renderWithWrapper(
      <MoviesList
        handleMovieDelete={handleMovieDelete}
        movies={[]}
      />
    )

    expect(mockedMovieItem).not.toHaveBeenCalled()
    expect(queryByTestId('movie-item')).toBeNull()
  })

  it('should call "handleMovieDelete" when delete button clicked', async () => {
    mockedMovieItem.mockImplementation(({ handleMovieDelete: onDelete }) => (
      <button
        data-testid='deleteMovieBtn'
        onClick={() => onDelete?.(new MouseEvent('click'), mockMovie.id)}
      />
    ))

    renderWithWrapper(<MoviesList {...props} />)

    const deleteBtn = screen.getByTestId('deleteMovieBtn')
    await user.click(deleteBtn)

    expect(props.handleMovieDelete).toHaveBeenCalledWith(
      expect.any(MouseEvent),
      mockMovie.id
    )
  })
})
