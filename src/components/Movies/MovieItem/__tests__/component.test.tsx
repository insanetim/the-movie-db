import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { assoc } from 'ramda'
import { mockMovie } from 'src/__mocks__/mockMovie'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import MovieItem from '../component'
import { MovieItemHookReturn, MovieItemProps } from '../types'

const mockedHook: MovieItemHookReturn = {
  handleClick: jest.fn(),
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('MovieItem component', () => {
  const user = userEvent.setup()
  const props: MovieItemProps = {
    handleMovieDelete: jest.fn(),
    id: mockMovie.id,
    overview: mockMovie.overview,
    posterPath: mockMovie.poster_path,
    title: mockMovie.title,
  }

  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<MovieItem {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot without poster_path', () => {
    const newProps = assoc('posterPath', null, props)

    const { asFragment } = renderWithWrapper(<MovieItem {...newProps} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleClick" when card clicked', async () => {
    renderWithWrapper(<MovieItem {...props} />)

    const card = screen.getByTestId('movieItemCard')
    await user.click(card)

    expect(mockedHook.handleClick).toHaveBeenCalled()
  })

  it('should call "handleMovieDelete" when delete button clicked', async () => {
    renderWithWrapper(<MovieItem {...props} />)

    const deleteBtn = screen.getByTestId('deleteMovieBtn')
    await user.click(deleteBtn)

    expect(props.handleMovieDelete).toHaveBeenCalled()
  })
})
