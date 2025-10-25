import { screen } from '@testing-library/react'
import { mockPersonDetails } from 'src/__mocks__/mockPerson'
import MovieItem from 'src/components/Movies/MovieItem'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import KnownFor from '../component'

jest.mock('src/components/Movies/MovieItem', () =>
  jest.fn(() => <div data-testid='known-for-item' />)
)

const mockedMovieItem = MovieItem as jest.Mock

describe('KnownFor component', () => {
  beforeEach(() => {
    mockedMovieItem.mockClear()
  })

  it('renders sorted cast items for acting department', () => {
    renderWithWrapper(
      <KnownFor
        credits={mockPersonDetails.movie_credits}
        department='Acting'
      />
    )

    expect(
      screen.getByRole('heading', { name: 'Known For' })
    ).toBeInTheDocument()
    expect(screen.getAllByTestId('known-for-item')).toHaveLength(
      mockPersonDetails.movie_credits.cast.length
    )
    expect(mockedMovieItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        id: mockPersonDetails.movie_credits.cast[0].id,
        posterPath: mockPersonDetails.movie_credits.cast[0].poster_path,
        title: mockPersonDetails.movie_credits.cast[0].title,
      }),
      expect.anything()
    )
  })

  it('renders crew items filtered by department when not acting', () => {
    renderWithWrapper(
      <KnownFor
        credits={mockPersonDetails.movie_credits}
        department='Directing'
      />
    )

    const directingCrew = mockPersonDetails.movie_credits.crew.filter(
      item => item.department === 'Directing'
    )

    expect(mockedMovieItem).toHaveBeenCalledTimes(directingCrew.length)
    expect(mockedMovieItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ id: directingCrew[0].id }),
      expect.anything()
    )
  })
})
