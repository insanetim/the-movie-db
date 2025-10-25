import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockMovie } from 'src/__mocks__/mockMovie'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import MovieItem from '../component'
import { MovieItemHookReturn, MovieItemProps } from '../types'

const mockedHook: MovieItemHookReturn = {
  handleNavigateToMovie: jest.fn(),
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('MovieItem component', () => {
  const user = userEvent.setup()
  let props: MovieItemProps

  beforeEach(() => {
    jest.clearAllMocks()
    props = {
      handleMovieDelete: jest.fn(),
      id: mockMovie.id,
      overview: mockMovie.overview,
      posterPath: mockMovie.poster_path,
      title: mockMovie.title,
    }
  })

  it('renders movie card with poster and metadata', () => {
    renderWithWrapper(<MovieItem {...props} />)

    const card = screen.getByTestId('movieItemCard')
    const poster = screen.getByRole('img', { name: mockMovie.title })

    expect(card).toBeInTheDocument()
    expect(poster).toHaveAttribute(
      'src',
      `https://image.tmdb.org/t/p/w500${mockMovie.poster_path}`
    )
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument()
    expect(screen.getByText(mockMovie.overview!)).toBeInTheDocument()
  })

  it('renders placeholder image when poster is missing', () => {
    renderWithWrapper(
      <MovieItem
        {...props}
        posterPath={null}
      />
    )

    const placeholderWrapper = document.querySelector(
      '.ant-card-cover--no-image'
    )

    expect(placeholderWrapper).toBeInTheDocument()
    expect(placeholderWrapper?.querySelector('img')?.getAttribute('alt')).toBe(
      mockMovie.title
    )
  })

  it('navigates to movie when card is clicked', async () => {
    renderWithWrapper(<MovieItem {...props} />)

    await user.click(screen.getByTestId('movieItemCard'))

    expect(mockedHook.handleNavigateToMovie).toHaveBeenCalled()
  })

  it('calls delete handler when delete icon clicked', async () => {
    renderWithWrapper(<MovieItem {...props} />)

    await user.click(screen.getByTestId('deleteMovieBtn'))

    expect(props.handleMovieDelete).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'click' }),
      props.id
    )
  })
})
