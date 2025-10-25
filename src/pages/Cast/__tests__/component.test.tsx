import { screen } from '@testing-library/react'
import { mockMovieDetailsExtended } from 'src/__mocks__/mockMovie'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Cast from '../component'
import { CastHookReturn } from '../types'

const defaultMovie = () => ({ ...mockMovieDetailsExtended })

const mockedHook: CastHookReturn = {
  error: null,
  isLoading: false,
  movie: defaultMovie(),
  movieSlug: '1234-test-movie',
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('Cast component', () => {
  beforeEach(() => {
    mockedHook.error = null
    mockedHook.isLoading = false
    mockedHook.movie = defaultMovie()
    mockedHook.movieSlug = '1234-test-movie'
  })

  it('should render movie details with cast and crew lists', () => {
    renderWithWrapper(<Cast />)

    expect(
      screen.getByRole('heading', { name: /test\/title \(1999\)/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /back to movie details/i })
    ).toHaveAttribute('href', '/movie/1234-test-movie')

    const counts = document.querySelectorAll('.total-count')
    expect(counts).toHaveLength(2)
    counts.forEach(count => expect(count).toHaveTextContent('(1)'))
  })

  it('should omit release year when release_date is missing', () => {
    mockedHook.movie!.release_date = undefined

    renderWithWrapper(<Cast />)

    expect(
      screen.getByRole('heading', { name: /test\/title$/i })
    ).toBeInTheDocument()
  })

  it('should show empty state when movie data missing', () => {
    mockedHook.movie = undefined

    renderWithWrapper(<Cast />)

    expect(screen.getByText(/movie not found/i)).toBeInTheDocument()
  })

  it('should show loading indicator when data is loading', () => {
    mockedHook.isLoading = true

    renderWithWrapper(<Cast />)

    expect(document.querySelector('.ant-spin')).toBeInTheDocument()
  })

  it('should show error state when request fails', () => {
    mockedHook.error = 'Something went wrong!'

    renderWithWrapper(<Cast />)

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument()
  })
})
