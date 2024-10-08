import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockMovie } from 'src/__mocks__/mockMovie'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Favorite from '../component'
import { FavoriteHookReturn } from '../types'

const mockedHook: FavoriteHookReturn = {
  error: null,
  handleMovieDelete: jest.fn(),
  handlePagination: jest.fn(),
  loading: false,
  movies: {
    page: 1,
    results: [mockMovie],
    total_pages: 10,
    total_results: 200,
  },
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('Favorite component', () => {
  const user = userEvent.setup()

  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<Favorite />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handlePagination" when pagination clicked', async () => {
    renderWithWrapper(<Favorite />)

    const link = screen.getByText('2')
    await user.click(link)

    expect(mockedHook.handlePagination).toHaveBeenCalled()
  })

  it('should call "handleMovieDelete" when delete button clicked', async () => {
    renderWithWrapper(<Favorite />)

    const deleteBtn = screen.getByTestId('deleteMovieBtn')
    await user.click(deleteBtn)

    expect(mockedHook.handleMovieDelete).toHaveBeenCalled()
  })

  it('should match snapshot with 1 page', () => {
    mockedHook.movies = {
      page: 1,
      results: [mockMovie],
      total_pages: 1,
      total_results: 1,
    }
    const { asFragment } = renderWithWrapper(<Favorite />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with empty movies', () => {
    mockedHook.movies = null
    const { asFragment } = renderWithWrapper(<Favorite />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    mockedHook.loading = true
    const { asFragment } = renderWithWrapper(<Favorite />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with error', () => {
    mockedHook.loading = false
    mockedHook.error = 'Something went wrong!'
    const { asFragment } = renderWithWrapper(<Favorite />)

    expect(asFragment()).toMatchSnapshot()
  })
})
